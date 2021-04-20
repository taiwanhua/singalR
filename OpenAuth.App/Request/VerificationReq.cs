namespace OpenAuth.App.Request
{
    public class VerificationReq
    {
        public string FlowInstanceId { get; set; }
        /// <summary>
        /// 1:同意；2：不同意；3：駁回
        /// </summary>
        public string VerificationFinally { get; set; }

        /// <summary>
        /// 審核意見
        /// </summary>
        public string VerificationOpinion { get; set; }

        /// <summary>
        /// 駁回的步驟，即駁回到的節點ID
        /// </summary>
        public string NodeRejectStep { get; set; }
        
        /// <summary>
        /// 駁回型別。null:使用節點配置的駁回型別/0:前一步/1:第一步/2：指定節點，使用NodeRejectStep
        /// </summary>
        public string NodeRejectType { get; set; }
    }
}
