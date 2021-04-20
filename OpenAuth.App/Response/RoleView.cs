// ***********************************************************************
// Assembly         : OpenAuth.App
// Author           : yubaolee
// Created          : 11-29-2015
//
// Last Modified By : yubaolee
// Last Modified On : 11-29-2015
// ***********************************************************************
// <copyright file="RoleVM.cs" company="www.cnblogs.com/yubaolee">
//     Copyright (c) www.cnblogs.com/yubaolee. All rights reserved.
// </copyright>
// <summary>角色模型檢視</summary>
// ***********************************************************************

using Infrastructure;
using OpenAuth.Repository.Domain;

namespace OpenAuth.App.Response
{
    public partial class RoleView
    {
        /// <summary>
        /// 使用者ID
        /// </summary>
        /// <returns></returns>
        public string Id { get; set; }

        /// <summary>
        /// 名稱
        /// </summary>
        /// <returns></returns>
        public string Name { get; set; }

        /// <summary>
        /// 當前狀態
        /// </summary>
        public int Status { get; set; }
        /// <summary>
	    /// 角色型別
	    /// </summary>
        public int Type { get; set; }


        /// <summary>
        ///是否屬於某使用者 
        /// </summary>
        public bool Checked { get; set; }

        public static implicit operator RoleView(Role role)
        {
            return role.MapTo<RoleView>();
        }

        public static implicit operator Role(RoleView rolevm)
        {
            return rolevm.MapTo<Role>();
        }

    }
}
