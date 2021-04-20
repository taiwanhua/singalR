namespace OpenAuth.Repository.Core
{
    public abstract class BaseEntity
    {
        /// <summary>
        /// 判斷主鍵是否為空，常用做判定操作是【新增】還是【編輯】
        /// </summary>
        /// <returns></returns>
        public abstract bool KeyIsNull();

        /// <summary>
        /// 建立預設的主鍵值
        /// </summary>
        public abstract void GenerateDefaultKeyVal();

        public BaseEntity()
        {
            if (KeyIsNull())
            {
                GenerateDefaultKeyVal();
            }
        }
    }
}