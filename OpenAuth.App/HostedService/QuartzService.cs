using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Quartz;

namespace OpenAuth.App.HostedService
{
    public class QuartzService : IHostedService, IDisposable
    {
        private readonly ILogger<QuartzService> _logger;
        private IScheduler _scheduler;

        public QuartzService(ILogger<QuartzService> logger, IScheduler scheduler)
        {
            _logger = logger;
            _scheduler = scheduler;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("啟動定時job，可以在這裡配置讀取資料庫需要啟動的任務，然後啟動他們");
            _scheduler.Start();
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _scheduler.Shutdown();
            _logger.LogInformation("關閉定時job");
            return Task.CompletedTask;
        }

        public void Dispose()
        {
           
        }
    }
}