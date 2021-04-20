// ***********************************************************************
// Assembly         : Infrastructure
// Author           : yubaolee
// Created          : 06-21-2016
//
// Last Modified By : yubaolee
// Last Modified On : 06-22-2016
// Contact : 
// File: UriUtil.cs
// ***********************************************************************

using System;
using System.Collections.Specialized;
using System.Web;

namespace Infrastructure.Utilities
{
    /// <summary>
    /// URl幫助類
    /// </summary>
    public class UriUtil
    {
        /// <summary>
        /// 在URL後面追加參數
        /// </summary>
        /// <param name="url"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string GetAppendedQueryString(string url, string key, string value)
        {
            if (url.Contains("?"))
            {
                url = string.Format("{0}&{1}={2}", url, key, value);
            }
            else
            {
                url = string.Format("{0}?{1}={2}", url, key, value);
            }

            return url;
        }

        public static string RemoveParameter(string url, string key)
        {

            url = url.ToLower();
            key = key.ToLower();
            if (!url.Contains(key + "=")) return url;

            Uri uri = new Uri(url);
            NameValueCollection collection = HttpUtility.ParseQueryString(uri.Query);
            if (collection.Count == 0) return url;

            var val = collection[key];
            string fragmentToRemove = string.Format("{0}={1}",key , val);

            String result = url.ToLower().Replace("&" + fragmentToRemove, string.Empty).Replace("?" + fragmentToRemove, string.Empty);
            return result;
        }

        /// <summary>
        /// 根據URL的相對地址獲取決定路徑
        /// <para>eg: /Home/About ==>http://192.168.0.1/Home/About</para>
        /// </summary>
        /// <returns>System.String.</returns>
        //public static string GetAbsolutePathForRelativePath(string relativePath)
        //{
        //    HttpRequest Request = HttpContext.Current.Request;
        //    string returnUrl = string.Format("{0}{1}",Request.Url.AbsoluteUri.Replace(Request.Url.PathAndQuery, string.Empty) , VirtualPathUtility.ToAbsolute(relativePath));
        //    return returnUrl;
        //}
    }
}