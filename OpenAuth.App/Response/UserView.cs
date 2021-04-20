using System;
using Infrastructure;
using OpenAuth.Repository.Domain;

namespace OpenAuth.App.Response
{
    public  class UserView
    {
        /// <summary>
        /// 使用者ID
        /// </summary>
        /// <returns></returns>
        public string Id { get; set; }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public string Account { get; set; }


        /// <summary>
        /// 組織名稱
        /// </summary>
        /// <returns></returns>
        public string Name { get; set; }


        /// <summary>
        /// </summary>
        /// <returns></returns>
        public int Sex { get; set; }


        /// <summary>
        /// 當前狀態
        /// </summary>
        /// <returns></returns>
        public int Status { get; set; }


        /// <summary>
        /// 組織型別
        /// </summary>
        /// <returns></returns>
        public int Type { get; set; }



        /// <summary>
        /// 建立時間
        /// </summary>
        /// <returns></returns>
        public DateTime CreateTime { get; set; }


        /// <summary>
        /// 建立人名字
        /// </summary>
        /// <value>The create user.</value>
        public string CreateUser { get; set; }

        /// <summary>
        /// 所屬組織名稱，多個可用，分隔
        /// </summary>
        /// <value>The organizations.</value>
        public string Organizations { get; set; }

        public string OrganizationIds { get; set; }

        public static implicit operator UserView(User user)
        {
            return user.MapTo<UserView>();
        }

        public static implicit operator User(UserView view)
        {
            return view.MapTo<User>();
        }

        public UserView()
        {
            Organizations = string.Empty;
            OrganizationIds = string.Empty;
            CreateUser = string.Empty;
        }
    }
}
