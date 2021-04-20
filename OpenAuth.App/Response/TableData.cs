// ***********************************************************************
// Assembly         : FundationAdmin
// Author           : yubaolee
// Created          : 03-09-2016
//
// Last Modified By : yubaolee
// Last Modified On : 03-09-2016
// ***********************************************************************
// <copyright file="TableData.cs" company="Microsoft">
//     版權所有(C) Microsoft 2015
// </copyright>
// <summary>layui datatable數據返回</summary>
// ***********************************************************************

using System.Collections.Generic;
using Infrastructure;

namespace OpenAuth.App.Response
{
    /// <summary>
    /// table的返回數據
    /// </summary>
    public class TableData
    {
        /// <summary>
        /// 狀態碼
        /// </summary>
        public int code { get; set; }
        /// <summary>
        /// 操作訊息
        /// </summary>
        public string msg { get; set; }

        /// <summary>
        /// 總記錄條數
        /// </summary>
        public int count { get; set; }

        /// <summary>
        ///  返回的列表頭資訊
        /// </summary>
        public List<KeyDescription> columnHeaders;

        /// <summary>
        /// 數據內容
        /// </summary>
        public dynamic data { get; set; }

        public TableData()
        {
            code = 200;
            msg = "載入成功";
            columnHeaders = new List<KeyDescription>();
        }
    }
}