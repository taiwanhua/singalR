//------------------------------------------------------------------------------
// <autogenerated>
//     This code was generated by a CodeSmith Template.
//
//     DO NOT MODIFY contents of this file. Changes to this
//     file will be lost if the code is regenerated.
//     Author:Yubao Li
// </autogenerated>
//------------------------------------------------------------------------------
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using OpenAuth.Repository.Core;

namespace OpenAuth.Repository.Domain
{
    /// <summary>
	/// 模擬一個自定頁面的表單，該數據會關聯到流程實例FrmData，可用於複雜頁面的設計及後期的數據分析
	/// </summary>
      [Table("FrmLeaveReq")]
    public partial class FrmLeaveReq : Entity
    {
        public FrmLeaveReq()
        {
          this.UserName= string.Empty;
          this.RequestType= string.Empty;
          this.StartDate= DateTime.Now;
          this.StartTime= DateTime.Now;
          this.EndDate= DateTime.Now;
          this.EndTime= DateTime.Now;
          this.RequestComment= string.Empty;
          this.Attachment= string.Empty;
          this.CreateDate= DateTime.Now;
          this.CreateUserId= string.Empty;
          this.CreateUserName= string.Empty;
            this.FlowInstanceId = string.Empty;
        }

        /// <summary>
	    /// 請假人姓名
	    /// </summary>
         [Description("請假人姓名")]
        public string UserName { get; set; }
        /// <summary>
	    /// 請假分類，病假，事假，公休等
	    /// </summary>
         [Description("請假分類，病假，事假，公休等")]
        public string RequestType { get; set; }
        /// <summary>
	    /// 開始日期
	    /// </summary>
         [Description("開始日期")]
        public System.DateTime StartDate { get; set; }
        /// <summary>
	    /// 開始時間
	    /// </summary>
         [Description("開始時間")]
        public System.DateTime? StartTime { get; set; }
        /// <summary>
	    /// 結束日期
	    /// </summary>
         [Description("結束日期")]
        public System.DateTime EndDate { get; set; }
        /// <summary>
	    /// 結束時間
	    /// </summary>
         [Description("結束時間")]
        public System.DateTime? EndTime { get; set; }
        /// <summary>
	    /// 請假說明
	    /// </summary>
         [Description("請假說明")]
        public string RequestComment { get; set; }
        /// <summary>
	    /// 附件，用於提交病假證據等
	    /// </summary>
         [Description("附件，用於提交病假證據等")]
        public string Attachment { get; set; }
        /// <summary>
	    /// 建立時間
	    /// </summary>
         [Description("建立時間")]
        public System.DateTime CreateDate { get; set; }
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
        ///    所屬流程實例ID
        /// </summary>
        public string FlowInstanceId { get; set; }

    }
}