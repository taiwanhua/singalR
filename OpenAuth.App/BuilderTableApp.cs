using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;
using System.Threading.Tasks;
using Infrastructure;
using Infrastructure.Extensions;
using Infrastructure.Helpers;
using Infrastructure.Utilities;
using Microsoft.Extensions.DependencyModel;
using Microsoft.Extensions.Options;
using OpenAuth.App.Interface;
using OpenAuth.App.Request;
using OpenAuth.App.Response;
using OpenAuth.Repository;
using OpenAuth.Repository.Core;
using OpenAuth.Repository.Domain;
using OpenAuth.Repository.Interface;


namespace OpenAuth.App
{
    public class BuilderTableApp : BaseApp<BuilderTable,OpenAuthDBContext>
    {
        private BuilderTableColumnApp _builderTableColumnApp;
        private CategoryApp _categoryApp;
        private DbExtension _dbExtension;
        private string _webProject = null;
        private string _apiNameSpace = null;
        private string _startName = "";
        private IOptions<AppSetting> _appConfiguration;

        public BuilderTableApp(IUnitWork<OpenAuthDBContext> unitWork, IRepository<BuilderTable,OpenAuthDBContext> repository,
            RevelanceManagerApp app, IAuth auth, DbExtension dbExtension, BuilderTableColumnApp builderTableColumnApp,
            IOptions<AppSetting> appConfiguration, CategoryApp categoryApp) : base(unitWork, repository, auth)
        {
            _dbExtension = dbExtension;
            _builderTableColumnApp = builderTableColumnApp;
            _appConfiguration = appConfiguration;
            _categoryApp = categoryApp;
        }

        private string StratName
        {
            get
            {
                if (_startName == "")
                {
                    _startName = WebProject.Substring(0, _webProject.IndexOf('.'));
                }

                return _startName;
            }
        }

        private string WebProject
        {
            get
            {
                if (_webProject != null)
                    return _webProject;
                _webProject = ProjectPath.GetLastIndexOfDirectoryName(".WebApi") ??
                             ProjectPath.GetLastIndexOfDirectoryName("Api") ??
                             ProjectPath.GetLastIndexOfDirectoryName(".Mvc");
                if (_webProject == null)
                {
                    throw new Exception("未獲取到以.WebApi結尾的專案名稱,無法建立頁面");
                }

                return _webProject;
            }
        }

        /// <summary>
        /// 載入列表
        /// </summary>
        public async Task<TableResp<BuilderTable>> Load(QueryBuilderTableListReq request)
        {
            var loginContext = _auth.GetCurrentUser();
            if (loginContext == null)
            {
                throw new CommonException("登錄已過期", Define.INVALID_TOKEN);
            }

            var result = new TableResp<BuilderTable>();
            var objs = UnitWork.Find<BuilderTable>(null);
            if (!string.IsNullOrEmpty(request.key))
            {
                objs = objs.Where(u => u.Id.Contains(request.key));
            }

            result.data = objs.OrderBy(u => u.Id)
                .Skip((request.page - 1) * request.limit)
                .Take(request.limit).ToList();
            result.count = objs.Count();
            return result;
        }

        public string Add(AddOrUpdateBuilderTableReq req)
        {
            if (string.IsNullOrEmpty(req.TableName))
            {
                throw new Exception("英文表名不能為空");
            }

            if (string.IsNullOrEmpty(req.ModuleName))
            {
                throw new Exception("模組名稱不能為空");
            }
            
            if (string.IsNullOrEmpty(req.Namespace))
            {
                throw new Exception("名稱空間不能為空");
            }
            
            var columns = _dbExtension.GetDbTableStructure(req.TableName);
            if (!columns.Any())
            {
                throw new Exception($"未能找到{req.TableName}表結構定義");
            }

            var obj = req.MapTo<BuilderTable>();
            if (string.IsNullOrEmpty(obj.ClassName)) obj.ClassName = obj.TableName;
            if (string.IsNullOrEmpty(obj.ModuleCode)) obj.ModuleCode = obj.TableName;
            
            //todo:補充或調整自己需要的欄位
            obj.CreateTime = DateTime.Now;
            var user = _auth.GetCurrentUser().User;
            obj.CreateUserId = user.Id;
            obj.CreateUserName = user.Name;
            UnitWork.Add(obj);

            foreach (var column in columns)
            {
                var builderColumn = new BuilderTableColumn
                {
                    ColumnName = column.ColumnName,
                    Comment = column.Comment,
                    ColumnType = column.ColumnType,
                    EntityType = column.EntityType,
                    EntityName = column.ColumnName,

                    IsKey = column.IsKey == 1,
                    IsRequired = column.IsNull != 1,
                    IsEdit = true,
                    IsInsert = true,
                    IsList = true,
                    MaxLength = column.MaxLength,
                    TableName = obj.TableName,
                    TableId = obj.Id,

                    CreateUserId = user.Id,
                    CreateUserName = user.Name,
                    CreateTime = DateTime.Now
                };
                UnitWork.Add(builderColumn);
            }

            UnitWork.Save();
            return obj.Id;
        }

        public void Update(AddOrUpdateBuilderTableReq obj)
        {
            var user = _auth.GetCurrentUser().User;
            UnitWork.Update<BuilderTable>(u => u.Id == obj.Id, u => new BuilderTable
            {
                TableName = obj.TableName,
                Comment = obj.Comment,
                DetailTableName = obj.DetailTableName,
                DetailComment = obj.DetailComment,
                ClassName = obj.ClassName,
                Namespace = obj.Namespace,
                ModuleCode = obj.ModuleCode,
                ModuleName = obj.ModuleName,
                Folder = obj.Folder,
                Options = obj.Options,
                TypeId = obj.TypeId,
                TypeName = obj.TypeName,
                UpdateTime = DateTime.Now,
                UpdateUserId = user.Id,
                UpdateUserName = user.Name
                //todo:補充或調整自己需要的欄位
            });
        }

        /// <summary>
        /// 刪除頭和欄位明細
        /// </summary>
        /// <param name="ids"></param>
        public void DelTableAndcolumns(string[] ids)
        {
            UnitWork.ExecuteWithTransaction(() =>
            {
                UnitWork.Delete<BuilderTable>(u => ids.Contains(u.Id));
                UnitWork.Delete<BuilderTableColumn>(u => ids.Contains(u.TableId));
                UnitWork.Save();
            });
        }


        /// <summary>
        /// 產生實體Model
        /// </summary>
        /// <returns></returns>
        public void CreateEntity(CreateEntityReq req)
        {
            var sysTableInfo = Repository.FirstOrDefault(u => u.Id == req.Id);
            var tableColumns = _builderTableColumnApp.Find(req.Id);
            if (sysTableInfo == null
                || tableColumns == null
                || tableColumns.Count == 0)
                throw new Exception("未能找到正確的模版資訊");

            CheckExistsModule(sysTableInfo.ClassName);

            CreateEntityModel(tableColumns, sysTableInfo);
        }
        
        
        /// <summary>
        /// 建立業務邏輯層
        /// </summary>
        /// <returns></returns>
        public void CreateBusiness(CreateBusiReq req)
        {
            var sysTableInfo = Repository.FirstOrDefault(u => u.Id == req.Id);
            var tableColumns = _builderTableColumnApp.Find(req.Id);
            if (sysTableInfo == null
                || tableColumns == null
                || tableColumns.Count == 0)
                throw new Exception("未能找到正確的模版資訊");

            //產生應用層
            GenerateApp(sysTableInfo);

            //產生應用層的請求參數
            GenerateAppReq(sysTableInfo, tableColumns);
            
            //產生WebApI接口
            GenerateWebApi(sysTableInfo);
        }

        /// <summary>
        /// 建立應用層
        /// </summary>
        /// <param name="sysTableInfo"></param>
        /// <exception cref="Exception"></exception>
        private void GenerateApp(BuilderTable sysTableInfo)
        {
            string appRootPath = ProjectPath.GetProjectDirectoryInfo()
                .GetDirectories().FirstOrDefault(x => x.Name.ToLower().EndsWith(".app"))?.FullName;
            if (string.IsNullOrEmpty(appRootPath))
            {
                throw new Exception("未找到openauth.app類庫,請確認是否存在");
            }

            CheckExistsModule(sysTableInfo.ModuleCode);

            string domainContent = FileHelper.ReadFile(@"Template\\BuildApp.html")
                .Replace("{TableName}", sysTableInfo.TableName)
                .Replace("{ModuleCode}", sysTableInfo.ModuleCode)
                .Replace("{ModuleName}", sysTableInfo.ModuleName)
                .Replace("{ClassName}", sysTableInfo.ClassName)
                .Replace("{StartName}", StratName);
            FileHelper.WriteFile(appRootPath, sysTableInfo.ModuleCode + ".cs", domainContent);
        }
        
        /// <summary>
        /// 產生APP層的請求參數
        /// </summary>
        /// <param name="sysTableInfo"></param>
        /// <param name="tableColumns"></param>
        private void GenerateAppReq(BuilderTable sysTableInfo, List<BuilderTableColumn> tableColumns)
        {
            string appRootPath = ProjectPath.GetProjectDirectoryInfo()
                .GetDirectories().FirstOrDefault(x => x.Name.ToLower().EndsWith(".app"))?.FullName;
            if (string.IsNullOrEmpty(appRootPath))
            {
                throw new Exception("未找到openauth.app類庫,請確認是否存在");
            }
            string domainContent;
            domainContent = FileHelper.ReadFile(@"Template\\BuildQueryReq.html")
                .Replace("{TableName}", sysTableInfo.TableName)
                .Replace("{ModuleCode}", sysTableInfo.ModuleCode)
                .Replace("{ModuleName}", sysTableInfo.ModuleName)
                .Replace("{ClassName}", sysTableInfo.ClassName)
                .Replace("{StartName}", StratName);
            FileHelper.WriteFile(Path.Combine(appRootPath, "Request"), $"Query{sysTableInfo.ClassName}ListReq.cs",
                domainContent);


            domainContent = FileHelper.ReadFile(@"Template\\BuildUpdateReq.html");

            StringBuilder attributeBuilder = new StringBuilder();
            var sysColumn = tableColumns.OrderByDescending(c => c.Sort).ToList();
            foreach (BuilderTableColumn column in sysColumn)
            {
                attributeBuilder.Append("/// <summary>");
                attributeBuilder.Append("\r\n");
                attributeBuilder.Append("       ///" + column.Comment + "");
                attributeBuilder.Append("\r\n");
                attributeBuilder.Append("       /// </summary>");
                attributeBuilder.Append("\r\n");

                string entityType = column.EntityType;
                if (!column.IsRequired && column.EntityType != "string")
                {
                    entityType = entityType + "?";
                }

                attributeBuilder.Append("       public " + entityType + " " + column.EntityName + " { get; set; }");
                attributeBuilder.Append("\r\n\r\n       ");
            }

            domainContent = domainContent.Replace("{ClassName}", sysTableInfo.ClassName)
                .Replace("{AttributeList}", attributeBuilder.ToString());

            var tableAttr = new StringBuilder();
            tableAttr.Append("/// <summary>");
            tableAttr.Append("\r\n");
            tableAttr.Append("       ///" + sysTableInfo.Comment + "");
            tableAttr.Append("\r\n");
            tableAttr.Append("       /// </summary>");
            tableAttr.Append("\r\n");
            domainContent = domainContent.Replace("{AttributeManager}", tableAttr.ToString());

            FileHelper.WriteFile(Path.Combine(appRootPath, "Request"), $"AddOrUpdate{sysTableInfo.ClassName}Req.cs",
                domainContent);
        }

        /// <summary>
        /// 建立WebAPI接口
        /// </summary>
        /// <param name="sysTableInfo"></param>
        /// <exception cref="Exception"></exception>
        private void GenerateWebApi(BuilderTable sysTableInfo)
        {
            string domainContent;
            string apiPath = ProjectPath.GetProjectDirectoryInfo()
                .GetDirectories().FirstOrDefault(x => x.Name.ToLower().EndsWith(".webapi"))?.FullName;
            if (string.IsNullOrEmpty(apiPath))
            {
                throw new Exception("未找到webapi類庫,請確認是存在weiapi類庫命名以.webapi結尾");
            }

            var controllerName = sysTableInfo.ClassName + "sController";
            CheckExistsModule(controllerName); //單元測試下無效，因為沒有執行webapi專案
            var controllerPath = apiPath + $"\\Controllers\\";
            domainContent = FileHelper.ReadFile(@"Template\\BuildControllerApi.html")
                .Replace("{TableName}", sysTableInfo.TableName)
                .Replace("{ModuleCode}", sysTableInfo.ModuleCode)
                .Replace("{ModuleName}", sysTableInfo.ModuleName)
                .Replace("{ClassName}", sysTableInfo.ClassName)
                .Replace("{StartName}", StratName);
            FileHelper.WriteFile(controllerPath, controllerName + ".cs", domainContent);
        }
        
        /// <summary>
        /// 建立實體
        /// </summary>
        /// <param name="tableColumns"></param>
        /// <param name="sysTableInfo"></param>
        private void CreateEntityModel(List<BuilderTableColumn> sysColumn, BuilderTable tableInfo)
        {
            string template = "BuildEntity.html";
            string domainContent = FileHelper.ReadFile("Template\\" + template);

            StringBuilder attributeBuilder = new StringBuilder();
            StringBuilder constructionBuilder = new StringBuilder();   //產生建構函式初始化值
            sysColumn = sysColumn.OrderByDescending(c => c.Sort).ToList();
            foreach (BuilderTableColumn column in sysColumn)
            {
                if (column.IsKey) continue;

                attributeBuilder.Append("/// <summary>");
                attributeBuilder.Append("\r\n");
                attributeBuilder.Append("       ///" + column.Comment + "");
                attributeBuilder.Append("\r\n");
                attributeBuilder.Append("       /// </summary>");
                attributeBuilder.Append("\r\n");
                
                attributeBuilder.Append("       [Description(\""+ column.Comment +"\")]");
                attributeBuilder.Append("\r\n");

                string entityType = column.EntityType;
                if (!column.IsRequired && column.EntityType != "string")
                {
                    entityType = entityType + "?";
                }

                attributeBuilder.Append("       public " + entityType + " " + column.EntityName + " { get; set; }");
                attributeBuilder.Append("\r\n\r\n       ");

                constructionBuilder.Append("       this." + column.EntityName
                                                   + "=" + (GetDefault(column.EntityType)??"\"\"")
                                                   + ";\r\n");
            }

            //獲取的是本地開發程式碼所在目錄，不是發布后的目錄
            string mapPath =
                ProjectPath.GetProjectDirectoryInfo()?.FullName; //new DirectoryInfo(("~/").MapPath()).Parent.FullName;
            if (string.IsNullOrEmpty(mapPath))
            {
                throw new Exception("未找到產生的目錄!");
            }

            domainContent = domainContent.Replace("{ClassName}", tableInfo.ClassName)
                .Replace("{AttributeList}", attributeBuilder.ToString())
                .Replace("{Construction}", constructionBuilder.ToString());


            var tableAttr = new StringBuilder();

            tableAttr.Append("/// <summary>");
            tableAttr.Append("\r\n");
            tableAttr.Append("       ///" + tableInfo.Comment + "");
            tableAttr.Append("\r\n");
            tableAttr.Append("       /// </summary>");
            tableAttr.Append("\r\n");
            tableAttr.Append("       [Table(\"" + tableInfo.TableName + "\")]");
            domainContent = domainContent.Replace("{AttributeManager}", tableAttr.ToString());

            FileHelper.WriteFile(
                mapPath +
                $"\\OpenAuth.Repository\\Domain\\", tableInfo.ClassName + ".cs",
                domainContent);
        }

        private bool IsMysql()
        {
            return (_appConfiguration.Value.DbType == Define.DBTYPE_MYSQL);
        }

        Dictionary<string, Type> PrimitiveTypes = new Dictionary<string, Type>()
        {
            {"int", typeof(int)}
            ,{"long", typeof(long)}
            ,{"string", typeof(string)}
            ,{"bool", typeof(bool)}
            ,{"byte", typeof(byte)}
            ,{"char", typeof(char)}
            ,{"decimal", typeof(decimal)}
            ,{"double", typeof(double)}
            ,{"DateTime", typeof(DateTime)}
        };
        string? GetDefault(string type)
        {
            Type t = PrimitiveTypes[type];
            if (t == null)
            {
                return null;
            }

            if (t.IsValueType)
            {
                if (type == "DateTime")
                {
                    return "DateTime.Now;";
                }
                return Activator.CreateInstance(t).ToString();
            }

            return null;
        }
        

        /// <summary>
        /// 校驗模組是否已經存在
        /// </summary>
        /// <param name="moduleName"></param>
        /// <param name="moduleCode"></param>
        /// <exception cref="Exception"></exception>
        public void CheckExistsModule(string moduleCode)
        {
            //如果是第一次建立model，此處反射獲取到的是已經快取過的檔案，必須重新執行專案否則新增的檔案無法做判斷檔案是否建立，需要重新做反射實際檔案，待修改...
            var compilationLibrary = DependencyContext
                .Default
                .CompileLibraries
                .Where(x => !x.Serviceable && x.Type == "project");
            foreach (var compilation in compilationLibrary)
            {
                var types = AssemblyLoadContext.Default
                    .LoadFromAssemblyName(new AssemblyName(compilation.Name))
                    .GetTypes().Where(x => x.GetTypeInfo().BaseType != null
                                           && x.BaseType == typeof(Entity));
                foreach (var entity in types)
                {
                    if (entity.Name == moduleCode )
                        throw new Exception($"實際表名【{moduleCode}】已建立實體，不能建立實體");

                    if (entity.Name != moduleCode)
                    {
                        var tableAttr = entity.GetCustomAttribute<TableAttribute>();
                        if (tableAttr != null && tableAttr.Name == moduleCode)
                        {
                            throw new Exception(
                                $"實際表名【{moduleCode}】已被建立建實體,不能建立");
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 建立vue界面
        /// </summary>
        /// <param name="req"></param>
        /// <exception cref="Exception"></exception>
        public void CreateVue(CreateVueReq req)
        {
            if (string.IsNullOrEmpty(req.VueProjRootPath))
            {
                throw new Exception("請提供vue專案的根目錄,如：C:\\OpenAuth.Pro\\Client");
            }
            var sysTableInfo = Repository.FirstOrDefault(u => u.Id == req.Id);
            var tableColumns = _builderTableColumnApp.Find(req.Id);
            if (sysTableInfo == null
                || tableColumns == null
                || tableColumns.Count == 0)
                throw new Exception("未能找到正確的模版資訊");
            
            var domainContent = FileHelper.ReadFile(@"Template\\BuildVue.html");

            StringBuilder dialogStrBuilder = new StringBuilder();   //編輯對話方塊
            StringBuilder tempBuilder = new StringBuilder();   //臨時類的預設值屬性
            var syscolums = tableColumns.OrderByDescending(c => c.Sort).ToList();
            
            string[] eidtTye = new string[] { "select", "selectList", "checkbox" };
            if (syscolums.Exists(x => eidtTye.Contains(x.EditType) && string.IsNullOrEmpty(x.DataSource)))
            {
                throw new Exception($"編輯型別為[{string.Join(',', eidtTye)}]時必須選擇資料來源");
            }
            
            foreach (BuilderTableColumn column in syscolums)
            {
                if (!column.IsEdit) continue;
                tempBuilder.Append($"                    {column.ColumnName.ToCamelCase()}: ");
                
                dialogStrBuilder.Append($"                   <el-form-item size=\"small\" :label=\"'{column.Comment}'\" prop=\"{column.ColumnName.ToCamelCase()}\" v-if=\"Object.keys(temp).indexOf('{column.ColumnName.ToCamelCase()}')>=0\">\r\n");

                if (column.EditType == "switch")
                {
                    dialogStrBuilder.Append($"                     <el-switch v-model=\"temp.{column.ColumnName.ToCamelCase()}\" ></el-switch>\r\n");
                    tempBuilder.Append($"false, //{column.Comment} \r\n");
                }
                else  if (column.EditType == "date")
                {
                    dialogStrBuilder.Append($"                     <el-date-picker  v-model=\"temp.{column.ColumnName.ToCamelCase()}\" type=\"date\" placeholder=\"選擇日期\"> </el-date-picker>\r\n");
                    tempBuilder.Append($"'', //{column.Comment} \r\n");
                }
                else  if (column.EditType == "datetime")
                {
                    dialogStrBuilder.Append($"                     <el-date-picker  v-model=\"temp.{column.ColumnName.ToCamelCase()}\" type=\"datetime\" placeholder=\"選擇日期時間\"> </el-date-picker>\r\n");
                    tempBuilder.Append($"'', //{column.Comment} \r\n");
                }
                else  if (column.EditType == "decimal")  //小數
                {
                    dialogStrBuilder.Append($"                     <el-input-number v-model=\"temp.{column.ColumnName.ToCamelCase()}\" :min=\"1\" :max=\"100\" ></el-input-number>\r\n");
                    tempBuilder.Append($"0, //{column.Comment} \r\n");
                }
                else  if (column.EditType =="number") //整數
                {
                    dialogStrBuilder.Append($"                     <el-input-number v-model=\"temp.{column.ColumnName.ToCamelCase()}\" :min=\"1\" :max=\"100\" ></el-input-number>\r\n");
                    tempBuilder.Append($"0, //{column.Comment} \r\n");
                }
                else if (column.EditType =="textarea") 
                {
                    dialogStrBuilder.Append($"                     <el-input type=\"textarea\" :rows=\"3\"  v-model=\"temp.{column.ColumnName.ToCamelCase()}\"></el-input>\r\n");
                    tempBuilder.Append($"'', //{column.Comment} \r\n");
                } 
                else if (column.EditType =="select")
                {
                    var categories = _categoryApp.LoadByTypeId(column.DataSource);
                    if (categories.IsNullOrEmpty())
                    {
                        throw new Exception($"未能找到{column.DataSource}對應的值，請在分類管理裡面新增");
                    }
                    
                    dialogStrBuilder.Append($"                     <el-select v-model=\"temp.{column.ColumnName.ToCamelCase()}\" placeholder=\"請選擇\">\r\n");
                    foreach (var category in categories)
                    {
                        dialogStrBuilder.Append($"                          <el-option label=\"{category.Name}\" value=\"{category.DtValue}\"> </el-option>\r\n");
                    }
                    dialogStrBuilder.Append("                     </el-select>\r\n");
                    tempBuilder.Append($"'', //{column.Comment} \r\n");
                } 
                else if (column.EditType =="checkbox")
                {
                    var categories = _categoryApp.LoadByTypeId(column.DataSource);
                    if (categories.IsNullOrEmpty())
                    {
                        throw new Exception($"未能找到{column.DataSource}對應的值，請在分類管理裡面新增");
                    }
                    
                    dialogStrBuilder.Append($"                     <el-checkbox-group v-model=\"temp.{column.ColumnName.ToCamelCase()}\">\r\n");
                    foreach (var category in categories)
                    {
                        dialogStrBuilder.Append($"                         <el-checkbox label=\"{category.DtValue}\"></el-checkbox>\r\n");
                    }
                    dialogStrBuilder.Append("                     </el-checkbox-group>\r\n");
                    tempBuilder.Append($"[], //{column.Comment} \r\n");
                } 
                else
                {
                    dialogStrBuilder.Append($"                     <el-input v-model=\"temp.{column.ColumnName.ToCamelCase()}\"></el-input>\r\n");
                    tempBuilder.Append($"'', //{column.Comment} \r\n");
                } 
                
                dialogStrBuilder.Append("                   </el-form-item>\r\n");
                dialogStrBuilder.Append("\r\n");
            }

            tempBuilder.Append("                    nothing:''  //程式碼產生時的占位符，看不順眼可以刪除 \r\n");

            domainContent = domainContent.Replace("{ClassName}", sysTableInfo.ClassName)
                .Replace("{TableName}", sysTableInfo.ClassName.ToCamelCase())
                .Replace("{Temp}", tempBuilder.ToString())
                .Replace("{DialogFormItem}", dialogStrBuilder.ToString());
            
            FileHelper.WriteFile(Path.Combine(req.VueProjRootPath, $"src/views/{sysTableInfo.ClassName.ToLower()}s/"), 
                $"index.vue",
                domainContent);
        }
        
        /// <summary>
        /// 建立vue接口
        /// </summary>
        /// <param name="req"></param>
        /// <exception cref="Exception"></exception>
        public void CreateVueApi(CreateVueReq req)
        {
            if (string.IsNullOrEmpty(req.VueProjRootPath))
            {
                throw new Exception("請提供vue專案的根目錄,如：C:\\OpenAuth.Pro\\Client");
            }
            var sysTableInfo = Repository.FirstOrDefault(u => u.Id == req.Id);
            var tableColumns = _builderTableColumnApp.Find(req.Id);
            if (sysTableInfo == null
                || tableColumns == null
                || tableColumns.Count == 0)
                throw new Exception("未能找到正確的模版資訊");
            
            var domainContent = FileHelper.ReadFile(@"Template\\BuildVueApi.html");

            domainContent = domainContent.Replace("{TableName}", sysTableInfo.ClassName.ToCamelCase());
            
            FileHelper.WriteFile(Path.Combine(req.VueProjRootPath, $"src/api/"),$"{sysTableInfo.ClassName.ToCamelCase()}s.js", 
                domainContent);
        }
    }
}

