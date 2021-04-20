using System;
using System.Linq;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using OpenAuth.App.Interface;
using OpenAuth.Repository.Core;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App
{
    /// <summary>
    /// 業務層基類，UnitWork用於事務操作，Repository用於普通的資料庫操作
    /// <para>如使用者管理：Class UserManagerApp:BaseApp<User></para>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseApp<T, TDbContext> where T : Entity where TDbContext: DbContext
    {
        /// <summary>
        /// 用於普通的資料庫操作
        /// </summary>
        protected IRepository<T, TDbContext> Repository;

        /// <summary>
        /// 用於事務操作
        /// <para>使用詳見：http://doc.openauth.me/core/unitwork.html</para>
        /// </summary>
        protected IUnitWork<TDbContext> UnitWork;

        protected IAuth _auth;

        public BaseApp(IUnitWork<TDbContext> unitWork, IRepository<T,TDbContext> repository, IAuth auth)
        {
            UnitWork = unitWork;
            Repository = repository;
            _auth = auth;
        }

        /// <summary>
        ///  獲取當前登錄使用者的數據訪問許可權
        /// </summary>
        /// <param name=""parameterName>linq表達式參數的名稱，如u=>u.name中的"u"</param>
        /// <returns></returns>
        protected IQueryable<T> GetDataPrivilege(string parametername)
        {
            var loginUser = _auth.GetCurrentUser();
            if (loginUser.User.Account == Define.SYSTEM_USERNAME) return UnitWork.Find<T>(null);  //超級管理員特權
            
            var moduleName = typeof(T).Name;
            var rule = UnitWork.FirstOrDefault<DataPrivilegeRule>(u => u.SourceCode == moduleName);
            if (rule == null) return UnitWork.Find<T>(null); //沒有設定數據規則，那麼視為該資源允許被任何主體檢視
            if (rule.PrivilegeRules.Contains(Define.DATAPRIVILEGE_LOGINUSER) ||
                                             rule.PrivilegeRules.Contains(Define.DATAPRIVILEGE_LOGINROLE)||
                                             rule.PrivilegeRules.Contains(Define.DATAPRIVILEGE_LOGINORG))
            {
                
                //即把{loginUser} =='xxxxxxx'換為 loginUser.User.Id =='xxxxxxx'，從而把當前登錄的使用者名稱與當時設計規則時選定的使用者id對比
                rule.PrivilegeRules = rule.PrivilegeRules.Replace(Define.DATAPRIVILEGE_LOGINUSER, loginUser.User.Id);
                
                var roles = loginUser.Roles.Select(u => u.Id).ToList();
                roles.Sort(); //按字母排序,這樣可以進行like操作
                rule.PrivilegeRules = rule.PrivilegeRules.Replace(Define.DATAPRIVILEGE_LOGINROLE, 
                    string.Join(',',roles));
                
                var orgs = loginUser.Orgs.Select(u => u.Id).ToList();
                orgs.Sort(); 
                rule.PrivilegeRules = rule.PrivilegeRules.Replace(Define.DATAPRIVILEGE_LOGINORG, 
                    string.Join(',',orgs));
            }
            return UnitWork.Find<T>(null).GenerateFilter(parametername,
                JsonHelper.Instance.Deserialize<FilterGroup>(rule.PrivilegeRules));
        }

        /// <summary>
        /// 按id批量刪除
        /// </summary>
        /// <param name="ids"></param>
        public virtual void Delete(string[] ids)
        {
            Repository.Delete(u => ids.Contains(u.Id));
        }

        public T Get(string id)
        {
            return Repository.FirstOrDefault(u => u.Id == id);
        }

        /// <summary>
        /// 計算實體更新的層級資訊
        /// </summary>
        /// <typeparam name="U">U必須是一個繼承TreeEntity的結構</typeparam>
        /// <param name="entity"></param>
        public void CaculateCascade<U>(U entity) where U : TreeEntity
        {
            if (entity.ParentId == "") entity.ParentId = null;
            string cascadeId;
            int currentCascadeId = 1; //當前結點的級聯節點最後一位
            var sameLevels = UnitWork.Find<U>(o => o.ParentId == entity.ParentId && o.Id != entity.Id);
            foreach (var obj in sameLevels)
            {
                int objCascadeId = int.Parse(obj.CascadeId.TrimEnd('.').Split('.').Last());
                if (currentCascadeId <= objCascadeId) currentCascadeId = objCascadeId + 1;
            }

            if (!string.IsNullOrEmpty(entity.ParentId))
            {
                var parentOrg = UnitWork.FirstOrDefault<U>(o => o.Id == entity.ParentId);
                if (parentOrg != null)
                {
                    cascadeId = parentOrg.CascadeId + currentCascadeId + ".";
                    entity.ParentName = parentOrg.Name;
                }
                else
                {
                    throw new Exception("未能找到該組織的父節點資訊");
                }
            }
            else
            {
                cascadeId = ".0." + currentCascadeId + ".";
                entity.ParentName = "根節點";
            }

            entity.CascadeId = cascadeId;
        }
    }
}