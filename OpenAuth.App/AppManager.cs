using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App
{
    /// <summary>
    /// 分類管理
    /// </summary>
    public class AppManager : BaseApp<Application,OpenAuthDBContext>
    {
        public void Add(Application Application)
        {
            if (string.IsNullOrEmpty(Application.Id))
            {
                Application.Id = Guid.NewGuid().ToString();
            }
            Repository.Add(Application);
        }

        public void Update(Application Application)
        {
            Repository.Update(Application);
        }


        public async Task<List<Application>> GetList(QueryAppListReq request)
        {
            var applications =  UnitWork.Find<Application>(null) ;
           
            return applications.ToList();
        }

        public AppManager(IUnitWork<OpenAuthDBContext> unitWork, IRepository<Application,OpenAuthDBContext> repository,IAuth auth) : base(unitWork, repository, auth)
        {
        }
    }
}