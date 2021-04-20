namespace OpenAuth.App.Request
{
    /// <summary>
    /// 為角色分配數據欄位許可權
    /// </summary>
    public class AssignDataReq
    {
        /// <summary>
        /// 角色ID
        /// </summary>
        public string RoleId { get; set; }
        /// <summary>
        /// 模組的Code,比如Category/Resource
        /// </summary>
        public string ModuleCode { get; set; }
        /// <summary>
        /// 欄位名稱列表
        /// </summary>
        public string[] Properties { get; set; }
    }
}