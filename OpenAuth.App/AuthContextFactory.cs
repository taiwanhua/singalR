// ***********************************************************************
// Assembly         : OpenAuth.App
// Author           : 李玉寶
// Created          : 07-05-2018
//
// Last Modified By : 李玉寶
// Last Modified On : 07-05-2018
// ***********************************************************************
// <copyright file="AuthContextFactory.cs" company="OpenAuth.App">
//     Copyright (c) http://www.openauth.me. All rights reserved.
// </copyright>
// <summary>
// 使用者許可權策略工廠
//</summary>
// ***********************************************************************

using Infrastructure;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App
{
    /// <summary>
    ///  載入使用者所有可訪問的資源/機構/模組
    /// <para>李玉寶新增于2016-07-19 10:53:30</para>
    /// </summary>
    public class AuthContextFactory
    {
        private SystemAuthStrategy _systemAuth;
        private NormalAuthStrategy _normalAuthStrategy;
        private readonly IUnitWork<OpenAuthDBContext> _unitWork;

        public AuthContextFactory(SystemAuthStrategy sysStrategy
            , NormalAuthStrategy normalAuthStrategy
            , IUnitWork<OpenAuthDBContext> unitWork)
        {
            _systemAuth = sysStrategy;
            _normalAuthStrategy = normalAuthStrategy;
            _unitWork = unitWork;
        }

        public AuthStrategyContext GetAuthStrategyContext(string username)
        {
            if (string.IsNullOrEmpty(username)) return null;

            IAuthStrategy service = null;
             if (username == Define.SYSTEM_USERNAME)
            {
                service= _systemAuth;
            }
            else
            {
                service = _normalAuthStrategy;
                service.User = _unitWork.FirstOrDefault<User>(u => u.Account == username);
            }

         return new AuthStrategyContext(service);
        }
    }
}