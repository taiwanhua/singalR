using System.Linq;
using Microsoft.EntityFrameworkCore;
using OpenAuth.App.Interface;
using OpenAuth.Repository.Core;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App
{
    /// <summary>
    /// 樹狀結構處理
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseTreeApp<T,TDbContext> :BaseApp<T,TDbContext> where T : TreeEntity where TDbContext :DbContext
    {


        public BaseTreeApp(IUnitWork<TDbContext> unitWork, IRepository<T, TDbContext> repository, IAuth auth) 
            : base(unitWork, repository,auth)
        {
        }

       
        /// <summary>
        /// 更新樹狀結構實體
        /// </summary>
        /// <param name="obj"></param>
        /// <typeparam name="U"></typeparam>
        public void UpdateTreeObj<U>(U obj) where U : TreeEntity
        {
            CaculateCascade(obj);

            //獲取舊的的CascadeId
            var cascadeId = Repository.FirstOrDefault(o => o.Id == obj.Id).CascadeId;
            //根據CascadeId查詢子部門
            var objs = Repository.Find(u => u.CascadeId.Contains(cascadeId) && u.Id != obj.Id)
                .OrderBy(u => u.CascadeId).ToList();

            //更新操作
            UnitWork.Update(obj);

            //更新子模組的CascadeId
            foreach (var a in objs)
            {
                a.CascadeId = a.CascadeId.Replace(cascadeId, obj.CascadeId);
                if (a.ParentId == obj.Id)
                {
                    a.ParentName = obj.Name;
                }

                UnitWork.Update(a);
            }

            UnitWork.Save();
        }

       
    }
}