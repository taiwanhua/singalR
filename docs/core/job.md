# 定時任務

::: tip 提示
定時任務基於Quartz.Net開發
:::

## 編寫任務程式碼

在OpenAuth.App中編寫定時任務的執行程式碼。比如`TestJob`

```csharp
namespace OpenAuth.App.Jobs
{
    public class TestJob : IJob
    {
        private OpenJobApp _openJobApp;

        public TestJob(OpenJobApp openJobApp)
        {
            _openJobApp = openJobApp;
        }

        public Task Execute(IJobExecutionContext context)
        {
            var jobId = context.MergedJobDataMap.GetString(Define.JOBMAPKEY);
            //todo:獲取到定時任務的id，可以可以加入自己的自動任務邏輯
            _openJobApp.RecordRun(jobId);
            return Task.Delay(1);
        }
    }
}
```

## 新增任務執行規則

編寫完任務的執行程式碼后即可執行系統，在界面【基礎配置】-【定時任務】中新增任務的執行規則，如圖：

![](/addjob.png)

新增任務規則后，在界面直接點選`啟用`即可


::: tip 提示
企業版提供視覺化的CRON編輯界面,如圖：

![](/addjobpro.png)
:::

