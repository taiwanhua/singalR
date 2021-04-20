namespace OpenAuth.App.Request
{
    /// <summary>
    /// 角色分配使用者
    /// </summary>
    public class AssignRoleUsers
    {
        /// <summary>
        /// 角色id
        /// </summary>
        public string RoleId { get; set; }
        /// <summary>
        /// 使用者id列表
        /// </summary>
        public string[] UserIds { get; set; }
    }
}