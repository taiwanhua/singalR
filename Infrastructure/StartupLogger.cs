

using Microsoft.Extensions.Logging;

namespace Infrastructure
{
    /// <summary>
    /// 從3.0開始Startup ConfigureServices中不能使用ILogger，需要擴充套件
    /// </summary>
    public class StartupLogger
    {
        private readonly ILogger<StartupLogger> _logger;

        public StartupLogger(ILogger<StartupLogger> logger)
        {
            _logger = logger;
        }

        public void LogInformation(string message)
        {
            _logger.LogInformation(message);
        }
    }
}