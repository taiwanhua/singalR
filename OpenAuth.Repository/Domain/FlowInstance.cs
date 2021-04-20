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
	/// 工作流流程實例表
	/// </summary>
      [Table("FlowInstance")]
    public partial class FlowInstance : Entity
    {
        public FlowInstance()
        {
          this.InstanceSchemeId= string.Empty;
          this.Code= string.Empty;
          this.CustomName= string.Empty;
          this.ActivityId= string.Empty;
          this.ActivityName= string.Empty;
          this.PreviousId= string.Empty;
          this.SchemeContent= string.Empty;
          this.SchemeId= string.Empty;
          this.DbName= string.Empty;
          this.FrmData= string.Empty;
          this.FrmType= 0;
          this.FrmContentData= string.Empty;
          this.FrmContentParse= string.Empty;
          this.FrmId= string.Empty;
          this.SchemeType= string.Empty;
          this.Disabled= 0;
          this.CreateDate= DateTime.Now;
          this.CreateUserId= string.Empty;
          this.CreateUserName= string.Empty;
          this.FlowLevel= 0;
          this.Description= string.Empty;
          this.IsFinish= 0;
          this.MakerList= string.Empty;
        }

        /// <summary>
	    /// 流程實例模板Id【已廢棄】
	    /// </summary>
         [Description("流程實例模板Id")]
        public string InstanceSchemeId { get; set; }
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
	    /// 當前節點ID
	    /// </summary>
         [Description("當前節點ID")]
        public string ActivityId { get; set; }
        /// <summary>
	    /// 當前節點型別（0會簽節點）
	    /// </summary>
         [Description("當前節點型別（0會簽節點）")]
        public int? ActivityType { get; set; }
        /// <summary>
	    /// 當前節點名稱
	    /// </summary>
         [Description("當前節點名稱")]
        public string ActivityName { get; set; }
        /// <summary>
	    /// 前一個ID
	    /// </summary>
         [Description("前一個ID")]
        public string PreviousId { get; set; }
        /// <summary>
	    /// 流程模板內容
	    /// </summary>
         [Description("流程模板內容")]
        public string SchemeContent { get; set; }
        /// <summary>
	    /// 流程模板ID
	    /// </summary>
         [Description("流程模板ID")]
        public string SchemeId { get; set; }
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
	    /// 流程型別
	    /// </summary>
         [Description("流程型別")]
        public string SchemeType { get; set; }
        /// <summary>
	    /// 有效標誌
	    /// </summary>
         [Description("有效標誌")]
        public int Disabled { get; set; }
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
	    /// 等級
	    /// </summary>
         [Description("等級")]
        public int FlowLevel { get; set; }
        /// <summary>
	    /// 實例備註
	    /// </summary>
         [Description("實例備註")]
        public string Description { get; set; }
        /// <summary>
	    /// 是否完成
	    /// </summary>
         [Description("是否完成")]
        public int IsFinish { get; set; }
        /// <summary>
	    /// 執行人
	    /// </summary>
         [Description("執行人")]
        public string MakerList { get; set; }
        
        /// <summary>
        /// 所屬部門
        /// </summary>
        [Description("所屬部門")]
        public string OrgId { get; set; }

    }
}