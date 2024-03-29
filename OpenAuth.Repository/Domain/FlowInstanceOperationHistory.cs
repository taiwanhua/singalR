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
	/// 工作流實例操作記錄
	/// </summary>
      [Table("FlowInstanceOperationHistory")]
    public partial class FlowInstanceOperationHistory : Entity
    {
        public FlowInstanceOperationHistory()
        {
          this.InstanceId= string.Empty;
          this.Content= string.Empty;
          this.CreateDate= DateTime.Now;
          this.CreateUserId= string.Empty;
          this.CreateUserName= string.Empty;
        }

        /// <summary>
	    /// 實例程序Id
	    /// </summary>
         [Description("實例程序Id")]
        public string InstanceId { get; set; }
        /// <summary>
	    /// 操作內容
	    /// </summary>
         [Description("操作內容")]
        public string Content { get; set; }
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

    }
}