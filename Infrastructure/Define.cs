namespace Infrastructure
{
    public static class Define
    {
        public static string USERROLE = "UserRole";       //使用者角色關聯KEY
        public const string ROLERESOURCE= "RoleResource";  //角色資源關聯KEY
        public const string USERORG = "UserOrg";  //使用者機構關聯KEY
        public const string ROLEELEMENT = "RoleElement"; //角色菜單關聯KEY
        public const string ROLEMODULE = "RoleModule";   //角色模組關聯KEY
        public const string ROLEDATAPROPERTY = "RoleDataProperty";   //角色數據欄位許可權

        public const string DBTYPE_SQLSERVER = "SqlServer";    //sql server
        public const string DBTYPE_MYSQL = "MySql";    //sql server


        public const int INVALID_TOKEN = 50014;     //token無效

        public const string TOKEN_NAME = "X-Token";
        public const string TENANT_ID = "tenantId";


        public const string SYSTEM_USERNAME = "System";
        public const string SYSTEM_USERPWD = "123456";

        public const string DATAPRIVILEGE_LOGINUSER = "{loginUser}";  //數據許可權配置中，當前登錄使用者的key
        public const string DATAPRIVILEGE_LOGINROLE = "{loginRole}";  //數據許可權配置中，當前登錄使用者角色的key
        public const string DATAPRIVILEGE_LOGINORG = "{loginOrg}";  //數據許可權配置中，當前登錄使用者部門的key

        public const string JOBMAPKEY = "OpenJob";
    }
}
