using System;

namespace Infrastructure.Cache
{
    /// <summary>
    /// 快取接口
    /// </summary>
    public abstract class ICacheContext 
    {
        /// <summary>
        /// 獲取快取項
        /// </summary>
        /// <typeparam name="T">快取對像型別</typeparam>
        /// <param name="key">鍵</param>
        /// <returns>快取對像</returns>
        public abstract T Get<T>(string key) ;

        /// <summary>
        /// 設定快取項
        /// </summary>
        /// <typeparam name="T">快取對像型別</typeparam>
        /// <param name="key">鍵</param>
        /// <param name="t">快取對像</param>
        /// <returns>true成功,false失敗</returns>
        public abstract bool Set<T>(string key, T t, DateTime expire);

        /// <summary>
        /// 移除一個快取項
        /// </summary>
        /// <param name="key">快取項key</param>
        /// <returns>true成功,false失敗</returns>
        public abstract bool Remove(string key);

    }
}