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
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using OpenAuth.Repository.Core;

namespace OpenAuth.Repository.Domain
{
    /// <summary>
	/// 程式碼產生器的表資訊
	/// </summary>
    [Table("BuilderTable")]
    public partial class BuilderTable : Entity
    {
        public BuilderTable()
        {
          this.TableName= string.Empty;
          this.Comment= string.Empty;
          this.DetailTableName= string.Empty;
          this.DetailComment= string.Empty;
          this.ClassName= string.Empty;
          this.Namespace= string.Empty;
          this.ModuleCode= string.Empty;
          this.ModuleName= string.Empty;
          this.Folder= string.Empty;
          this.Options= string.Empty;
          this.TypeId= string.Empty;
          this.TypeName= string.Empty;
          this.CreateTime= DateTime.Now;
          this.CreateUserId= string.Empty;
          this.UpdateTime= DateTime.Now;
          this.UpdateUserId= string.Empty;
          this.UpdateUserName= string.Empty;
          this.CreateUserName= string.Empty;
        }

        
        /// <summary>
        /// 表英文全稱
        /// </summary>
        [Description("表英文全稱")]
        public string TableName { get; set; }
        /// <summary>
        /// 表描述、中文名稱
        /// </summary>
        [Description("表描述、中文名稱")]
        public string Comment { get; set; }
        /// <summary>
        /// 子表英文全稱
        /// </summary>
        [Description("子表英文全稱")]
        public string DetailTableName { get; set; }
        /// <summary>
        /// 子表描述、中文名稱
        /// </summary>
        [Description("子表描述、中文名稱")]
        public string DetailComment { get; set; }
        /// <summary>
        /// 實體類名稱
        /// </summary>
        [Description("實體類名稱")]
        public string ClassName { get; set; }
        /// <summary>
        /// 名稱空間
        /// </summary>
        [Description("名稱空間")]
        public string Namespace { get; set; }
        /// <summary>
        /// 模組標識
        /// </summary>
        [Description("模組標識")]
        public string ModuleCode { get; set; }
        /// <summary>
        /// 模組名稱
        /// </summary>
        [Description("模組名稱")]
        public string ModuleName { get; set; }
        /// <summary>
        /// 程式碼相對資料夾路徑
        /// </summary>
        [Description("程式碼相對資料夾路徑")]
        public string Folder { get; set; }
        /// <summary>
        /// 其它產生選項
        /// </summary>
        [Description("其它產生選項")]
        public string Options { get; set; }
        /// <summary>
        /// 分類ID
        /// </summary>
        [Description("分類ID")]
        [Browsable(false)]
        public string TypeId { get; set; }
        /// <summary>
        /// 分類名稱
        /// </summary>
        [Description("分類名稱")]
        public string TypeName { get; set; }
        /// <summary>
        /// 建立時間
        /// </summary>
        [Description("建立時間")]
        public System.DateTime CreateTime { get; set; }
        /// <summary>
        /// 建立人ID
        /// </summary>
        [Description("建立人ID")]
        [Browsable(false)]
        public string CreateUserId { get; set; }
        /// <summary>
        /// 修改時間
        /// </summary>
        [Description("修改時間")]
        public System.DateTime? UpdateTime { get; set; }
        /// <summary>
        /// 修改人ID
        /// </summary>
        [Description("修改人ID")]
        [Browsable(false)]
        public string UpdateUserId { get; set; }
        /// <summary>
        /// 修改人姓名
        /// </summary>
        [Description("修改人姓名")]
        public string UpdateUserName { get; set; }
        /// <summary>
        /// 建立人姓名
        /// </summary>
        [Description("建立人姓名")]
        public string CreateUserName { get; set; }
    }
}