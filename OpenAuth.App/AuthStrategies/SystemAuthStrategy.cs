// ***********************************************************************
// Assembly         : OpenAuth.App
// Author           : 李玉寶
// Created          : 06-06-2018
//
// Last Modified By : 李玉寶
// Last Modified On : 07-05-2018
// ***********************************************************************
// <copyright file="SystemAuthStrategy.cs" company="OpenAuth.App">
//     Copyright (c) http://www.openauth.me. All rights reserved.
// </copyright>
// <summary>
// 超級管理員授權策略
// </summary>
// ***********************************************************************

using System;
using System.Collections.Generic;
using System.Linq;
using Infrastructure;
using OpenAuth.App.Response;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App
{
    /// <summary>
    /// 領域服務
    /// <para>超級管理員許可權</para>
    /// <para>超級管理員使用guid.empty為ID，可以根據需要修改</para>
    /// </summary>
    public class SystemAuthStrategy : BaseApp<User,OpenAuthDBContext>, IAuthStrategy
    {
        protected User _user;
        private DbExtension _dbExtension;

        public List<ModuleView> Modules
        {
            get {
                var modules = (from module in UnitWork.Find<Module>(null)
                    select new ModuleView
                    {
                        SortNo = module.SortNo,
                        Name = module.Name,
                        Id = module.Id,
                        CascadeId = module.CascadeId,
                        Code = module.Code,
                        IconName = module.IconName,
                        Url = module.Url,
                        ParentId = module.ParentId,
                        ParentName = module.ParentName,
                        IsSys = module.IsSys,
                        Status = module.Status
                    }).ToList();

                foreach (var module in modules)
                {
                    module.Elements = UnitWork.Find<ModuleElement>(u => u.ModuleId == module.Id).ToList();
                }

                return modules;
            }
        }

        public List<Role> Roles
        {
            get { return UnitWork.Find<Role>(null).ToList(); }
        }

        public List<ModuleElement> ModuleElements
        {
            get { return UnitWork.Find<ModuleElement>(null).ToList(); }
        }

        public List<Resource> Resources
        {
            get { return UnitWork.Find<Resource>(null).ToList(); }
        }

        public List<Org> Orgs
        {
            get { return UnitWork.Find<Org>(null).ToList(); }
        }

        public User User
        {
            get { return _user; }
            set   //禁止外部設定
            {
                throw new Exception("超級管理員，禁止設定使用者");
            }  
        }

        public List<KeyDescription> GetProperties(string moduleCode)
        {
            return _dbExtension.GetProperties(moduleCode);
        }


        public SystemAuthStrategy(IUnitWork<OpenAuthDBContext> unitWork, IRepository<User,OpenAuthDBContext> repository, DbExtension dbExtension) : base(unitWork, repository, null)
        {
            _dbExtension = dbExtension;
            _user = new User
            {
                Account = Define.SYSTEM_USERNAME,
                Name = "超級管理員",
                Id = Guid.Empty.ToString()
            };
        }
    }
}