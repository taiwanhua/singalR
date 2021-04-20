using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;

namespace OpenAuth.App
{
    /// <summary>
    /// 分類管理
    /// </summary>
    public class ResourceApp:BaseApp<Resource,OpenAuthDBContext>
    {
        private RevelanceManagerApp _revelanceApp;

        public void Add(AddOrUpdateResReq resource)
        {
            var obj = resource.MapTo<Resource>();
            CaculateCascade(obj);
            obj.CreateTime = DateTime.Now;
            var user = _auth.GetCurrentUser().User;
            obj.CreateUserId = user.Id;
            obj.CreateUserName = user.Name;
            Repository.Add(obj);
        }

        public void Update(AddOrUpdateResReq obj)
        {
            var user = _auth.GetCurrentUser().User;
            UnitWork.Update<Category>(u => u.Id == obj.Id, u => new Category
            {
                TypeId = obj.TypeId,
                UpdateTime = DateTime.Now,
                UpdateUserId = user.Id,
                UpdateUserName = user.Name
                //todo:要修改的欄位賦值
            });
        }

        public IEnumerable<Resource> LoadForRole(string appId, string roleId)
        {
            var elementIds = _revelanceApp.Get(Define.ROLERESOURCE, true, roleId);
            return UnitWork.Find<Resource>(u => elementIds.Contains(u.Id) && (appId == null || appId =="" || u.AppId == appId));
        }
        
        public async Task<TableData> Load(QueryResourcesReq request)
        {
            var loginContext = _auth.GetCurrentUser();
            if (loginContext == null)
            {
                throw new CommonException("登錄已過期", Define.INVALID_TOKEN);
            }

            var properties = loginContext.GetProperties("Resource");

            if (properties == null || properties.Count == 0)
            {
                throw new Exception("當前登錄使用者沒有訪問該模組欄位的許可權，請聯繫管理員配置");
            }


            var result = new TableData();
            var resources = GetDataPrivilege("u");
            if (!string.IsNullOrEmpty(request.key))
            {
                resources = resources.Where(u => u.Name.Contains(request.key) || u.Id.Contains(request.key));
            }

            if (!string.IsNullOrEmpty(request.appId))
            {
                resources = resources.Where(u => u.AppId == request.appId);
            }

            var propertyStr = string.Join(',', properties.Select(u => u.Key));
            result.columnHeaders = properties;
            result.data = resources.OrderBy(u => u.TypeId)
                .Skip((request.page - 1) * request.limit)
                .Take(request.limit).Select($"new ({propertyStr})");
            result.count = resources.Count();
            return result;
        }

        public ResourceApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<Resource,OpenAuthDBContext> repository
        ,RevelanceManagerApp app,IAuth auth) : base(unitWork, repository, auth)
        {
            _revelanceApp = app;
        }
    }
}