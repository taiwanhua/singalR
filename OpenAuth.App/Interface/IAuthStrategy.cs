// ***********************************************************************
// Assembly         : OpenAuth.App
// Author           : 李玉寶
// Created          : 07-05-2018
//
// Last Modified By : 李玉寶
// Last Modified On : 07-05-2018
// ***********************************************************************
// <copyright file="IAuthStrategy.cs" company="OpenAuth.App">
//     Copyright (c) http://www.openauth.me. All rights reserved.
// </copyright>
// <summary>
// 授權策略接口
// </summary>
// ***********************************************************************


using System.Collections.Generic;
using Infrastructure;
using OpenAuth.App.Response;
using OpenAuth.Repository.Domain;

namespace OpenAuth.App
{
    public interface IAuthStrategy 
    {
         List<ModuleView> Modules { get; }

        List<ModuleElement> ModuleElements { get; }

        List<Role> Roles { get; }

         List<Resource> Resources { get; }

         List<Org> Orgs { get; }

         User User
        {
            get;set;
        }

        /// <summary>
        /// 根據模組id獲取可訪問的模組欄位
        /// </summary>
        /// <param name="moduleCode"></param>
        /// <returns></returns>
        List<KeyDescription> GetProperties(string moduleCode);

    }
}