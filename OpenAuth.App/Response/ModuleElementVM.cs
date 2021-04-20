namespace OpenAuth.App.Response
{
    /// <summary>
    /// 使用者ID
    /// </summary>
    public class ModuleElementVM
    {
        /// <summary>
        /// 使用者ID
        /// </summary>
        /// <returns></returns>
        public int Id { get; set; }

        /// <summary>
        /// DOM ID
        /// </summary>
        /// <returns></returns>
        public string DomId { get; set; }

        /// <summary>
        /// 組織名稱
        /// </summary>
        /// <returns></returns>
        public string Name { get; set; }

        //模組ID
        public int ModuleId { get; set; }

        /// <summary>
        /// 所屬模組名稱
        /// </summary>
        public string ModuleName { get; set; }

        /// <summary>
        /// 授權狀態
        /// </summary>
        public bool Accessed { get; set; }

        public ModuleElementVM()
        {
            this.Id = 0;
            this.DomId = string.Empty;
            this.Name = string.Empty;
            this.ModuleId = 0;
            this.ModuleName = string.Empty;
            this.Accessed = false;
        }
    }
}