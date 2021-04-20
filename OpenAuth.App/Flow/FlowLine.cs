// <copyright file="FlowLine.cs" company="openauth.me">
// Copyright (c) 2019 openauth.me. All rights reserved.
// </copyright>
// <author>www.cnblogs.com/yubaolee</author>
// <date>2019-03-05</date>
// <summary>流程中的連線</summary>

using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace OpenAuth.App.Flow
{
    /// <summary>
    /// 流程連線
    /// </summary>
    public class FlowLine
    {
        public string id { get; set; }
        public string label { get; set; }
        public string type { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public string name { get; set; }
        public bool dash { get; set; }

        /// <summary> 分支條件 </summary>
        public List<DataCompare> Compares { get; set; }

        public bool Compare(JObject frmDataJson)
        {
            bool result = true;
            foreach (var compare in Compares)
            {
                decimal value = decimal.Parse(compare.Value);  //參考值
                decimal frmvalue = decimal.Parse(frmDataJson.GetValue(compare.FieldName.ToLower()).ToString()); //表單中填寫的值

                switch (compare.Operation)
                {
                    case DataCompare.Equal:
                        result &= compare.Value == frmDataJson.GetValue(compare.FieldName).ToString();
                        break;
                    case DataCompare.Larger:
                        result &= frmvalue > value;
                        break;
                    case DataCompare.Less:
                        result &= frmvalue < value;
                        break;
                    case DataCompare.LargerEqual:
                        result &= frmvalue <= value;
                        break;
                    case DataCompare.LessEqual:
                        result &= frmvalue <= value;
                        break;
                }
            }

            return result;
        }
    }

    /// <summary>
    ///  分支條件
    /// </summary>
    public class DataCompare
    {
        public const string Larger = ">";
        public const string Less = "<";
        public const string LargerEqual = ">=";
        public const string LessEqual = "<=";
        public const string NotEqual = "!=";
        public const string Equal = "=";

        /// <summary>操作型別比如大於/等於/小於</summary>
        public string Operation { get; set; }

        /// <summary> form種的欄位名稱 </summary>
        public string FieldName { get; set; }

        /// <summary> 欄位型別："form"：為表單中的欄位，後期擴充套件系統表等. </summary>
        public string FieldType { get; set; }

        /// <summary>比較的值</summary>
        public string Value { get; set; }
    }
}
