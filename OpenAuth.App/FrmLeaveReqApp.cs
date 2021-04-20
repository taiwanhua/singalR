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
    public class FrmLeaveReqApp : BaseApp<FrmLeaveReq,OpenAuthDBContext>, ICustomerForm
    {
        private RevelanceManagerApp _revelanceApp;

        /// <summary>
        /// 載入列表
        /// </summary>
        public async Task<TableData> Load(QueryFrmLeaveReqListReq request)
        {
             return new TableData
            {
                count = Repository.Count(null),
                data = Repository.Find(request.page, request.limit, "Id desc")
            };
        }

        public void Add(FrmLeaveReq obj)
        {
            Repository.Add(obj);
        }
        
        public void Update(FrmLeaveReq obj)
        {
            UnitWork.Update<FrmLeaveReq>(u => u.Id == obj.Id, u => new FrmLeaveReq
            {
               //todo:要修改的欄位賦值
            });

        }

        public FrmLeaveReqApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<FrmLeaveReq,OpenAuthDBContext> repository,
            RevelanceManagerApp app,IAuth auth) : base(unitWork, repository, auth)
        {
            _revelanceApp = app;
        }

        public void Add(string flowInstanceId, string frmData)
        {
            var req = JsonHelper.Instance.Deserialize<FrmLeaveReq>(frmData);
            req.FlowInstanceId = flowInstanceId;
            Add(req);
        }
    }
}