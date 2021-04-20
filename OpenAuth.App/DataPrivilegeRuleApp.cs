using System;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;


namespace OpenAuth.App
{
    public class DataPrivilegeRuleApp : BaseApp<DataPrivilegeRule,OpenAuthDBContext>
    {
        private RevelanceManagerApp _revelanceApp;
        /// <summary>
        /// 載入列表
        /// </summary>
        public async Task<TableData> Load(QueryDataPrivilegeRuleListReq request)
        {
            var loginContext = _auth.GetCurrentUser();
            if (loginContext == null)
            {
                throw new CommonException("登錄已過期", Define.INVALID_TOKEN);
            }

            var properties = loginContext.GetProperties("DataPrivilegeRule");

            if (properties == null || properties.Count == 0)
            {
                throw new Exception("當前登錄使用者沒有訪問該模組欄位的許可權，請聯繫管理員配置");
            }


            var result = new TableData();
            var objs = UnitWork.Find<DataPrivilegeRule>(null);
            if (!string.IsNullOrEmpty(request.key))
            {
                objs = objs.Where(u => u.Id.Contains(request.key) || u.SourceCode.Contains(request.key) || u.Description.Contains(request.key));
            }


            var propertyStr = string.Join(',', properties.Select(u => u.Key));
            result.columnHeaders = properties;
            result.data = objs.OrderBy(u => u.Id)
                .Skip((request.page - 1) * request.limit)
                .Take(request.limit).Select($"new ({propertyStr})");
            result.count = objs.Count();
            return result;
        }

        public void Add(AddOrUpdateDataPriviReq req)
        {
            if (Repository.Any(u => u.SourceCode == req.SourceCode))
            {
                throw new Exception($"已經存在{req.SourceCode}的數據規則，如果想調整規制請直接修改");
            }
            var obj = req.MapTo<DataPrivilegeRule>();
            obj.CreateUserId = _auth.GetCurrentUser().User.Id;
            obj.CreateTime = DateTime.Now;
            Repository.Add(obj);
        }
        
        public void Update(AddOrUpdateDataPriviReq obj)
        {
            UnitWork.Update<DataPrivilegeRule>(u => u.Id == obj.Id, u => new DataPrivilegeRule
            {
                SortNo = obj.SortNo,
                SourceCode = obj.SourceCode,
                UpdateTime = DateTime.Now,
                UpdateUserId = _auth.GetCurrentUser().User.Id,
                Description = obj.Description,
                PrivilegeRules = obj.PrivilegeRules,
                Enable = obj.Enable
               //todo:要修改的欄位賦值
            });
    
        }

        public DataPrivilegeRuleApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<DataPrivilegeRule,OpenAuthDBContext> repository,
            RevelanceManagerApp app, IAuth auth) : base(unitWork, repository, auth)
        {
            _revelanceApp = app;
        }

        public DataPrivilegeRule GetByModuleName(string moduleName)
        {
            return Repository.FirstOrDefault(u=>u.SourceCode == moduleName);
        }

        public void Clear()
        {
            Repository.Delete(u =>true);
        }
    }
}