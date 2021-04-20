using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;


namespace OpenAuth.App
{
    public class SysLogApp : BaseApp<SysLog,OpenAuthDBContext>
    {

        /// <summary>
        /// 載入列表
        /// </summary>
        public async Task<TableData> Load(QuerySysLogListReq request)
        {
            var result = new TableData();
            var objs = UnitWork.Find<SysLog>(null);
            if (!string.IsNullOrEmpty(request.key))
            {
                objs = objs.Where(u => u.Content.Contains(request.key) || u.Id.Contains(request.key));
            }

            result.data = objs.OrderByDescending(u => u.CreateTime)
                .Skip((request.page - 1) * request.limit)
                .Take(request.limit);
            result.count = objs.Count();
            return result;
        }

        public void Add(SysLog obj)
        {
            //程式型別取入口應用的名稱，可以根據自己需要調整
            obj.Application = Assembly.GetEntryAssembly().FullName.Split(',')[0];
            Repository.Add(obj);
        }
        
        public void Update(SysLog obj)
        {
            UnitWork.Update<SysLog>(u => u.Id == obj.Id, u => new SysLog
            {
               //todo:要修改的欄位賦值
            });

        }

        public SysLogApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<SysLog,OpenAuthDBContext> repository) : base(unitWork, repository, null)
        {
        }
    }
}