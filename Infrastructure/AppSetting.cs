namespace Infrastructure
{
    /// <summary>
    /// 配置項
    /// </summary>
    public class AppSetting
    {

        public AppSetting()
        {
            SSOPassport = "http://localhost:52789";  
            Version = "";
            UploadPath = "";
            IdentityServerUrl = "";
            DbType = Define.DBTYPE_SQLSERVER;
        }
        /// <summary>
        /// SSO地址
        /// </summary>
        public string SSOPassport { get; set; }

        /// <summary>
        /// 版本資訊
        /// 如果為demo,則遮蔽Post請求
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// 資料庫型別 SqlServer、MySql
        /// </summary>
        public string DbType { get; set; }

        /// <summary> 附件上傳路徑</summary>
        public string UploadPath { get; set; }

        //identity授權的地址
        public string IdentityServerUrl { get; set; }

        //是否是Identity授權方式
        public bool IsIdentityAuth => !string.IsNullOrEmpty(IdentityServerUrl);
    }
}
