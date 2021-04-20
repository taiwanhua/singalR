namespace OpenAuth.App.Request
{
    public class ChangeProfileReq
    {
        public string Account { get; set; }
       
        /// <summary>
        /// 使用者姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 性別
        /// </summary>
        public int Sex { get; set; }
    }
}
