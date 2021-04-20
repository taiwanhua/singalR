using System;

namespace OpenAuth.App.SSO
{
    [Serializable]
    public class UserAuthSession
    {
        public string Token { get; set; }

        public string AppKey { get; set; }

        /// <summary>
        /// 使用者賬號
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 使用者名稱
        /// </summary>
        public string Name { get; set; }
        
        public string IpAddress { get; set; }

        public DateTime CreateTime { get; set; }
    }
}