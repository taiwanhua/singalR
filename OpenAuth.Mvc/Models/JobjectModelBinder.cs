using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json.Linq;

namespace OpenAuth.Mvc.Models
{
    /// <summary>
    /// 將前端傳來的FormData數據轉為Jobject型別
    /// 註：前端如果是application/json，可以直接轉JOjbect！
    /// </summary>
    public class JobjectModelBinder :IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var obj = new JObject();

            //// Specify a default argument name if none is set by ModelBinderAttribute
            //var modelName = bindingContext.BinderModelName;
            //if (string.IsNullOrEmpty(modelName))
            //{
            //    modelName = "obj";
            //}

            //// Try to fetch the value of the argument by name
            //var valueProviderResult =
            //    bindingContext.ValueProvider.GetValue(modelName);

            //這個地方會報StringValues的異常，好奇怪，只能除錯原始碼了
            var request = bindingContext.HttpContext.Request;
            foreach (var item in request.Form)
            {
                obj[item.Key] = item.Value[0];
            }

            bindingContext.Result = ModelBindingResult.Success(obj);
            return Task.CompletedTask;
        }
    }
}