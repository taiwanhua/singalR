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
	/// 角色表
	/// </summary>
      [Table("Role")]
    public partial class Role : Entity
    {
        public Role()
        {
          this.Name= string.Empty;
          this.Status= 0;
          this.CreateTime= DateTime.Now;
          this.CreateId= string.Empty;
          this.TypeName= string.Empty;
          this.TypeId= string.Empty;
        }

        /// <summary>
	    /// 角色名稱
	    /// </summary>
         [Description("角色名稱")]
        public string Name { get; set; }
        /// <summary>
	    /// 當前狀態
	    /// </summary>
         [Description("當前狀態")]
        public int Status { get; set; }
        /// <summary>
	    /// 建立時間
	    /// </summary>
         [Description("建立時間")]
        public System.DateTime CreateTime { get; set; }
        /// <summary>
	    /// 建立人ID
	    /// </summary>
         [Description("建立人ID")]
        public string CreateId { get; set; }
        /// <summary>
	    /// 分類名稱
	    /// </summary>
         [Description("分類名稱")]
        public string TypeName { get; set; }
        /// <summary>
	    /// 分類ID
	    /// </summary>
         [Description("分類ID")]
        public string TypeId { get; set; }

    }
}