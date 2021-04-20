using OpenAuth.Repository.Domain;

namespace OpenAuth.App.Response
{
    public class FlowVerificationResp :FlowInstance
    {
        /// <summary>
        /// 預覽表單數據
        /// </summary>
        /// <value>The FRM data HTML.</value>
        public string FrmPreviewHtml
        {
            get { return FormUtil.Preview(this); }
        }
    }
}
