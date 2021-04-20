// <copyright file="UploadFile.cs" company="openauth.me">
// Copyright (c) 2019 openauth.me. All rights reserved.
// </copyright>
// <author>www.cnblogs.com/yubaolee</author>
// <date>2019-03-07</date>
// <summary>附加實體</summary>

using System;
using System.ComponentModel.DataAnnotations.Schema;
using OpenAuth.Repository.Core;

namespace OpenAuth.Repository.Domain
{
    /// <summary>
	/// 檔案
	/// </summary>
    [Table("UploadFile")]
    public partial class UploadFile : Entity
    {
        public UploadFile()
        {
          this.FileName= string.Empty;
          this.FilePath= string.Empty;
          this.Description= string.Empty;
          this.FileType= string.Empty;
          this.Extension= string.Empty;
          this.SortCode= 0;
          this.CreateUserName= string.Empty;
          this.CreateTime= DateTime.Now;
          this.Thumbnail= string.Empty;
          this.BelongApp= string.Empty;
          this.BelongAppId= string.Empty;
        }

        /// <summary>
	    /// 檔名稱
	    /// </summary>
        public string FileName { get; set; }
        /// <summary>
	    /// 檔案路徑
	    /// </summary>
        public string FilePath { get; set; }
        /// <summary>
	    /// 描述
	    /// </summary>
        public string Description { get; set; }
        /// <summary>
	    /// 檔案型別
	    /// </summary>
        public string FileType { get; set; }
        /// <summary>
	    /// 檔案大小
	    /// </summary>
        public int? FileSize { get; set; }
        /// <summary>
	    /// 副檔名稱
	    /// </summary>
        public string Extension { get; set; }
        /// <summary>
	    /// 是否可用
	    /// </summary>
        public bool Enable { get; set; }
        /// <summary>
	    /// 排序
	    /// </summary>
        public int SortCode { get; set; }
        /// <summary>
	    /// 刪除標識
	    /// </summary>
        public bool DeleteMark { get; set; }
        /// <summary>
	    /// 上傳人
	    /// </summary>
        public System.Guid? CreateUserId { get; set; }
        /// <summary>
	    /// 上傳人姓名
	    /// </summary>
        public string CreateUserName { get; set; }
        /// <summary>
	    /// 上傳時間
	    /// </summary>
        public System.DateTime CreateTime { get; set; }
        /// <summary>
	    /// 縮圖
	    /// </summary>
        public string Thumbnail { get; set; }
        /// <summary>
	    /// 所屬應用
	    /// </summary>
        public string BelongApp { get; set; }
        /// <summary>
	    /// 所屬應用ID
	    /// </summary>
        public string BelongAppId { get; set; }

    }
}