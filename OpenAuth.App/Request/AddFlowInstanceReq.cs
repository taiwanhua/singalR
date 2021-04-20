//------------------------------------------------------------------------------
// <autogenerated>
//     This code was generated by a CodeSmith Template.
//
//     DO NOT MODIFY contents of this file. Changes to this
//     file will be lost if the code is regenerated.
//     Author:Yubao Li
// </autogenerated>
//------------------------------------------------------------------------------

using System.ComponentModel;

namespace OpenAuth.App.Request
{
    /// <summary>
	/// 建立工作流請求
	/// </summary>
    public class AddFlowInstanceReq 
    {

        /// <summary>
	    /// 實例編號
	    /// </summary>
         [Description("實例編號")]
        public string Code { get; set; }
        /// <summary>
	    /// 自定義名稱
	    /// </summary>
         [Description("自定義名稱")]
        public string CustomName { get; set; }



        /// <summary>
	    /// 流程模板內容
	    /// </summary>
         [Description("流程模板內容")]
        public string SchemeContent { get; set; }
        /// <summary>
	    /// 流程模板ID
	    /// </summary>
        public string SchemeId { get; set; }

        /// <summary>
        /// 流程模板自定義編號
        /// </summary>
        public string SchemeCode { get; set; }


        /// <summary>
	    /// 資料庫名稱
	    /// </summary>
         [Description("資料庫名稱")]
        public string DbName { get; set; }
        /// <summary>
	    /// 表單數據
	    /// </summary>
         [Description("表單數據")]
        public string FrmData { get; set; }
        /// <summary>
	    /// 表單型別
	    /// </summary>
         [Description("表單型別")]
        public int FrmType { get; set; }
        /// <summary>
	    /// 表單中的控制元件屬性描述
	    /// </summary>
         [Description("表單中的控制元件屬性描述")]
        public string FrmContentData { get; set; }
        /// <summary>
	    /// 表單控制元件位置模板
	    /// </summary>
         [Description("表單控制元件位置模板")]
        public string FrmContentParse { get; set; }
        /// <summary>
	    /// 表單ID
	    /// </summary>
         [Description("表單ID")]
        public string FrmId { get; set; }
        
        
        /// <summary>
        /// 所屬部門
        /// </summary>
        [Description("所屬部門")]
        public string OrgId { get; set; }

        /// <summary>
	    /// 建立使用者主鍵
	    /// </summary>
         [Description("建立使用者主鍵")]
        public string CreateUserId { get; set; }
        /// <summary>
	    /// 建立使用者
	    /// </summary>
         [Description("建立使用者")]
        public string CreateUserName { get; set; }

        /// <summary>
	    /// 實例備註
	    /// </summary>
         [Description("實例備註")]
        public string Description { get; set; }

    }
}