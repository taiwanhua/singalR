// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.Collections.Generic;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;

namespace OpenAuth.IdentityServer
{
     public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }
        /// <summary>
        /// API資訊
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<ApiResource> GetApis()
        {
            return new[]
            {
                new ApiResource("openauthapi", "OpenAuth.WebApi")
                {
                    UserClaims =  { ClaimTypes.Name, JwtClaimTypes.Name }
                }
            };
        }
        /// <summary>
        /// 客戶端資訊
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<Client> GetClients(bool isProduction)
        {
            var host = "http://localhost";
            if (isProduction)
            {
                host = "http://demo.openauth.me";  //切換為自己的伺服器資訊
            }
            return new[]
            {
                new Client
                {
                    ClientId = "OpenAuth.WebApi",//客戶端名稱
                    ClientName = "開源版webapi認證",//客戶端描述
                    AllowedGrantTypes = GrantTypes.Implicit,//Implicit 方式
                    AllowAccessTokensViaBrowser = true,//是否通過瀏覽器為此客戶端傳輸訪問令牌
                    RedirectUris =
                    {
                        $"{host}:52789/swagger/oauth2-redirect.html"
                    },
                    AllowedScopes = { "openauthapi" }
                },
                new Client
                {
                    ClientId = "OpenAuth.Mvc",
                    ClientName = "開源版mvc認證",
                    AllowedGrantTypes = GrantTypes.Implicit,

                    // 登錄成功回撥處理地址，處理回撥返回的數據
                    RedirectUris = { $"{host}:1802/signin-oidc" },

                    // where to redirect to after logout
                    PostLogoutRedirectUris = { $"{host}:1802/signout-callback-oidc" },

                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "openauthapi"
                    }
                },
                new Client
                {
                    ClientId = "OpenAuth.Pro",//企業版名稱
                    ClientName = "企業版js請求認證",//企業版描述
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,

                    RedirectUris =           { $"{host}:1803/#/oidc-callback" },
                    PostLogoutRedirectUris = { $"{host}:1803" },
                    AllowedCorsOrigins =     { $"{host}:1803" },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,  //請求使用者的姓名，昵稱等
                        "openauthapi"
                    }
                }
            };
        }
    }
}