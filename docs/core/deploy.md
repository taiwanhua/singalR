# 部署

::: tip 提示
因.net core內部有自託管的Web伺服器，推薦使用控制檯方式部署。本內容基於控制檯命令的方式。如果部署到IIS請自行百度:cold_sweat:
:::

## 產生發布檔案

* 修改部署環境的連線字串資訊,特別注意是`appsettings.Production.json`檔案：
![說明](/configmvc.png "說明")

::: warning 注意
決定系統部署後讀取`appsettings.json`還是`appsettings.Production.json`是通過作業系統的環境變數`ASPNETCORE_ENVIRONMENT`來控制的。
在centos切換成正式可以用
```shell
export ASPNETCORE_ENVIRONMENT=Production
```
在Widows系統中增加對應環境變數即可

:::

* 直接在解決方案資源管理器中，選中OpenAuth.Mvc右鍵【發布】，出現下面的配置框，使用檔案系統即可：

![說明](http://pj.openauth.me/zentao/file-read-8.png "說明")

* 發布完成後可以在輸出目錄看到發布詳情（紅色框內即為發布的資料夾）：

![說明](http://pj.openauth.me/zentao/file-read-69.png "說明")

## 部署OpenAuth.Mvc

將發布后的檔案拷貝到伺服器資料夾。直接使用`dotnet  openauth.mvc.dll` 命令啟動。啟動成功后使用瀏覽器打開http://localhost:1802 即可訪問，如下圖所示：

![說明](/mvcmain.png "說明")


## jenkins部署OpenAuth.Mvc

OpenAuth.Core採用的是gitee託管原始碼，只需使用Gitee WebHook構建觸發器。配置如下：

![說明](/giteesource.png "說明")

做好上面的配置后，程式碼提交時就會觸發jenkins工作。剩下的就是編寫自己的構建指令碼。增加構建步驟，選擇執行Shell。並輸入以下指令碼：

```shell
#!/bin/bash
kill -9 $(ps -ef|grep OpenAuth.Mvc.dll|grep -v grep|awk '{print $2}')

#專案啟動之後才不會被Jenkins殺掉。
export BUILD_ID=dontKillMe
pwd
echo $PATH
dotnet restore # 還原nuget包

cd ./OpenAuth.Mvc
dotnet build # 編譯

rm -rf /data/openauthmvc #最終站點路徑
mkdir /data/openauthmvc
dotnet publish -c:Release -o /data/openauthmvc # 產生發布檔案到/data/openauthmvc

nohup dotnet /data/openauthmvc/OpenAuth.Mvc.dll &

echo '============================end build======================================='
```


## 接口OpenAuth.WebApi部署

請檢視[企業版](http://openauth.me/question/detail.html?id=a2be2d61-7fcb-4df8-8be2-9f296c22a89c)內部文件


