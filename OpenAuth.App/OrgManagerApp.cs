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
    public class OrgManagerApp : BaseTreeApp<Org,OpenAuthDBContext>
    {
        private RevelanceManagerApp _revelanceApp;
        /// <summary>
        /// 新增部門
        /// </summary>
        /// <param name="org">The org.</param>
        /// <returns>System.Int32.</returns>
        /// <exception cref="System.Exception">未能找到該組織的父節點資訊</exception>
        public string Add(Org org)
        {
            var loginContext = _auth.GetCurrentUser();
            if (loginContext == null)
            {
                throw new CommonException("登錄已過期", Define.INVALID_TOKEN);
            }
            CaculateCascade(org);

            UnitWork.ExecuteWithTransaction(() =>
            {
                UnitWork.Add(org);
                UnitWork.Save();

                //如果當前賬號不是SYSTEM，則直接分配
                if (loginContext.User.Account != Define.SYSTEM_USERNAME)
                {
                    _revelanceApp.Assign(new AssignReq
                    {
                        type = Define.USERORG,
                        firstId = loginContext.User.Id,
                        secIds = new[] { org.Id }
                    });
                }
            });

            return org.Id;
        }

        public string Update(Org org)
        {
            UpdateTreeObj(org);

            return org.Id;
        }
        
        /// <summary>
        /// 刪除指定ID的部門及其所有子部門
        /// </summary>
        public void DelOrgCascade(string[] ids)
        {
            var delOrgCascadeIds = UnitWork.Find<Org>(u => ids.Contains(u.Id)).Select(u => u.CascadeId).ToArray();
            var delOrgIds = new List<string>();
            foreach (var cascadeId in delOrgCascadeIds)
            {
                delOrgIds.AddRange(UnitWork.Find<Org>(u=>u.CascadeId.Contains(cascadeId)).Select(u =>u.Id).ToArray());
            }
            
            UnitWork.Delete<Relevance>(u =>u.Key == Define.USERORG && delOrgIds.Contains(u.SecondId));
            UnitWork.Delete<Org>(u => delOrgIds.Contains(u.Id));
            UnitWork.Save();
            
        }

        /// <summary>
        /// 載入特定使用者的部門
        /// </summary>
        /// <param name="userId">The user unique identifier.</param>
        public List<Org> LoadForUser(string userId)
        {
            var result = from userorg in UnitWork.Find<Relevance>(null)
                join org in UnitWork.Find<Org>(null) on userorg.SecondId equals org.Id
                where userorg.FirstId == userId && userorg.Key == Define.USERORG
                select org;
            return result.ToList();
        }

        public OrgManagerApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<Org,OpenAuthDBContext> repository,IAuth auth, 
            RevelanceManagerApp revelanceApp) : base(unitWork, repository, auth)
        {
            _revelanceApp = revelanceApp;
        }
    }
}