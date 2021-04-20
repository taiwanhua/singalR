namespace OpenAuth.App.Request
{
    public class QueryWmsInboundOrderDtblListReq : PageReq
    {
        //todo:新增自己的請求欄位
        /// <summary>
        /// 入庫訂單號
        /// </summary>
        public string InboundOrderId { get; set; }
    }
}