using System.Collections.Generic;
using System.Linq;
using Infrastructure;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App
{
    public class ModuleManagerApp : BaseTreeApp<Module,OpenAuthDBContext>
    {
        private RevelanceManagerApp _revelanceApp;

        public void Add(Module model)
        {
            var loginContext = _auth.GetCurrentUser();
            if (loginContext == null)
            {
                throw new CommonException("登錄已過期", Define.INVALID_TOKEN);
            }

            CaculateCascade(model);

            Repository.Add(model);

            AddDefaultMenus(model);
            //當前登錄使用者的所有角色自動分配模組
            loginContext.Roles.ForEach(u =>
            {
                _revelanceApp.Assign(new AssignReq
                {
                    type = Define.ROLEMODULE,
                    firstId = u.Id,
                    secIds = new[] {model.Id}
                });
            });
        }

        public void Update(Module obj)
        {
            UpdateTreeObj(obj);
        }


        #region 使用者/角色分配模組

        /// <summary>
        /// 載入特定角色的模組
        /// </summary>
        /// <param name="roleId">The role unique identifier.</param>
        public IEnumerable<Module> LoadForRole(string roleId)
        {
            var moduleIds = UnitWork.Find<Relevance>(u => u.FirstId == roleId && u.Key == Define.ROLEMODULE)
                .Select(u => u.SecondId);
            return UnitWork.Find<Module>(u => moduleIds.Contains(u.Id)).OrderBy(u => u.SortNo);
        }

        //獲取角色可訪問的模組欄位
        public IEnumerable<string> LoadPropertiesForRole(string roleId, string moduleCode)
        {
            return _revelanceApp.Get(Define.ROLEDATAPROPERTY, roleId, moduleCode);
        }

        /// <summary>
        /// 根據某角色ID獲取可訪問某模組的菜單項
        /// </summary>
        public IEnumerable<ModuleElement> LoadMenusForRole(string moduleId, string roleId)
        {
            var elementIds = _revelanceApp.Get(Define.ROLEELEMENT, true, roleId);
            var query = UnitWork.Find<ModuleElement>(u => elementIds.Contains(u.Id));
            if (!string.IsNullOrEmpty(moduleId))
            {
                query = query.Where(u => u.ModuleId == moduleId);
            }

            return query;
        }

        #endregion 使用者/角色分配模組


        #region 菜單操作

        /// <summary>
        /// 刪除指定的菜單
        /// </summary>
        /// <param name="ids"></param>
        public void DelMenu(string[] ids)
        {
            UnitWork.Delete<ModuleElement>(u => ids.Contains(u.Id));
            UnitWork.Save();
        }


        /// <summary>
        /// 新增菜單
        /// <para>當前登錄使用者的所有角色會自動分配菜單</para>
        /// </summary>
        public void AddMenu(ModuleElement model)
        {
            var loginContext = _auth.GetCurrentUser();
            if (loginContext == null)
            {
                throw new CommonException("登錄已過期", Define.INVALID_TOKEN);
            }

            UnitWork.ExecuteWithTransaction(() =>
            {
                UnitWork.Add(model);

                //當前登錄使用者的所有角色自動分配菜單
                loginContext.Roles.ForEach(u =>
                {
                    _revelanceApp.Assign(new AssignReq
                    {
                        type = Define.ROLEELEMENT,
                        firstId = u.Id,
                        secIds = new[] {model.Id}
                    });
                });
                UnitWork.Save();
            });
        }

        public void UpdateMenu(ModuleElement model)
        {
            UnitWork.Update<ModuleElement>(model);
            UnitWork.Save();
        }

        //新增預設按鈕
        private void AddDefaultMenus(Module module)
        {
            AddMenu(new ModuleElement
            {
                ModuleId = module.Id,
                DomId = "btnAdd",
                Script = "add()",
                Name = "新增",
                Sort = 1,
                Icon = "xinzeng",
                Class = "success",
                Remark = "新增" + module.Name
            });
            AddMenu(new ModuleElement
            {
                ModuleId = module.Id,
                DomId = "btnEdit",
                Script = "edit()",
                Name = "編輯",
                Sort = 2,
                Icon = "bianji-copy",
                Class = "primary",
                Remark = "修改" + module.Name
            });
            AddMenu(new ModuleElement
            {
                ModuleId = module.Id,
                DomId = "btnDel",
                Script = "del()",
                Name = "刪除",
                Sort = 3,
                Icon = "shanchu",
                Class = "danger",
                Remark = "刪除" + module.Name
            });

            //todo:可以自己新增更多預設按鈕
        }

        #endregion


        public ModuleManagerApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<Module,OpenAuthDBContext> repository
            , RevelanceManagerApp app, IAuth auth) : base(unitWork, repository, auth)
        {
            _revelanceApp = app;
        }
    }
}