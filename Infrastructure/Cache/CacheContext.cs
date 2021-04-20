// ***********************************************************************
// Assembly         : Helper
// Author           : yubaolee
// Created          : 12-16-2016
//
// Last Modified By : yubaolee
// Last Modified On : 12-21-2016
// 使用微軟預設帶超時的Cache
// File: CacheContext.cs
// ***********************************************************************

using System;
using Microsoft.Extensions.Caching.Memory;

namespace Infrastructure.Cache
{
    public class CacheContext : ICacheContext
    {
        private IMemoryCache _objCache;

        public CacheContext(IMemoryCache objCache)
        {
            _objCache = objCache;
        }

        public override T Get<T>(string key)
        {
            return  _objCache.Get<T>(key);
        }

        public override bool Set<T>(string key, T t, DateTime expire)
        {
            var obj = Get<T>(key);
            if (obj != null)
            {
                Remove(key);
            }

            _objCache.Set(key, t, new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(expire));   //絕對過期時間

            return true;
        }

        public override bool Remove(string key)
        {
            _objCache.Remove(key);
            return true;
        }
    }
}
