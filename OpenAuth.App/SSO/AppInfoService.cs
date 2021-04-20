using System;
using System.Linq;

namespace OpenAuth.App.SSO
{
    public class AppInfoService 
    {
        public AppInfo Get(string appKey)
        {
            //可以從資料庫讀取
            return _applist.SingleOrDefault(u => u.AppKey == appKey);
        }

        private AppInfo[] _applist = new[]
        {
            new AppInfo
            {
                AppKey = "openauth",
                Icon = "/Areas/SSO/Content/images/logo.png",
                IsEnable = true,
                Remark = "基於DDDLite的許可權管理系統",
                ReturnUrl = "http://localhost:56813",
                Title = "OpenAuth.Core",
                CreateTime = DateTime.Now,
            },
            new AppInfo
            {
                AppKey = "openauthtest",
                Icon = "/Areas/SSO/Content/images/logo.png",
                IsEnable = true,
                Remark = "這只是個模擬的測試站點",
                ReturnUrl = "http://localhost:53050",
                Title = "OpenAuth.Core測試站點",
                CreateTime = DateTime.Now,
            }
        };
    }
}