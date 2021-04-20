namespace OpenAuth.App.Request
{
    /// <summary>
    /// 部門分配使用者
    /// </summary>
    public class AssignOrgUsers
    {
        /// <summary>
        /// 部門id
        /// </summary>
        public string OrgId { get; set; }
        /// <summary>
        /// 使用者id列表
        /// </summary>
        public string[] UserIds { get; set; }
    }
}