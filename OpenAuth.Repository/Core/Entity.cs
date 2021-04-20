using System;
using System.ComponentModel;

namespace OpenAuth.Repository.Core
{
    /// <summary>
    /// 主鍵為字串的實體基類，為系統預設的實體型別
    /// </summary>
    public class Entity : BaseEntity
    {
        [Browsable(false)]
        public string Id { get; set; }
        
        /// <summary>
        /// 判斷主鍵是否為空，常用做判定操作是【新增】還是【編輯】
        /// </summary>
        /// <returns></returns>
        public override bool KeyIsNull()
        {
            return string.IsNullOrEmpty(Id);
        }

        /// <summary>
        /// 建立預設的主鍵值
        /// </summary>
        public override void GenerateDefaultKeyVal()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}
