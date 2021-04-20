namespace OpenAuth.App.Request
{
    public class QueryFlowInstanceHistoryReq : PageReq
    {
        /// <summary>
        /// 流程實體名稱
        /// </summary>
        public string FlowInstanceId { get; set; }

    }
}
