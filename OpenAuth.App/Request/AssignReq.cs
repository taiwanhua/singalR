namespace OpenAuth.App.Request
{
    /// <summary>
    /// 比如給使用者分配資源，那麼firstId就是使用者ID，secIds就是資源ID列表
    /// </summary>
    public class AssignReq
    {
        /// <summary>
        /// 分配的關鍵字，比如：UserRole
        /// </summary>
        public string type { get; set; }
        /// <summary>
        /// 比如給使用者分配角色，那麼firstId就是使用者ID，secIds就是角色ID列表
        /// </summary>
        public string firstId { get; set; }
        public string[] secIds { get; set; }
    }
}