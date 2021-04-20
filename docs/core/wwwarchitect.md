# 前端結構

OpenAuth.Mvc前端採用典型的mvc結構部署，其中：

* Views: 為靜態資源頁面，最終會渲染成html（實在不懂，百度Asp.Net Mvc中的View）；

* wwwroot/js: 通用的js元件；

* wwwroot/userJs: 業務相關的js程式碼。通常一個csthml頁面對應一個userJs中的js檔案。如`Categories\Index.cshtml`對應`userJs\categories.js`

```shell
|-- OpenAuth.Mvc
    |-- Views
    |   |-- _ViewStart.cshtml
    |   |-- Categories
    |   |   |-- Index.cshtml
    |   |-- DataPrivilegeRules
    |   |   |-- index.cshtml
    |   |-- Error
    |   |   |-- Auth.cshtml
    |   |-- FlowInstances
    |   |   |-- Detail.cshtml
    |   |   |-- Disposed.cshtml
    |   |   |-- Edit.cshtml
    |   |   |-- Index.cshtml
    |   |   |-- Verification.cshtml
    |   |   |-- Wait.cshtml
    |   |-- FlowSchemes
    |   |   |-- Design.cshtml
    |   |   |-- Index.cshtml
    |   |   |-- NodeInfo.cshtml
    |   |   |-- Preview.cshtml
    |   |-- Forms
    |   |   |-- Edit.cshtml
    |   |   |-- index.cshtml
    |   |   |-- Preview.cshtml
    |   |-- Home
    |   |   |-- git.cshtml
    |   |   |-- Index.cshtml
    |   |   |-- Main.cshtml
    |   |-- Login
    |   |   |-- Index.cshtml
    |   |-- ModuleManager
    |   |   |-- Assign.cshtml
    |   |   |-- Index.cshtml
    |   |-- OpenJobs
    |   |   |-- index.cshtml
    |   |-- OrgManager
    |   |   |-- Index.cshtml
    |   |-- Redirects
    |   |   |-- IdentityAuth.cshtml
    |   |-- Resources
    |   |   |-- Assign.cshtml
    |   |   |-- Index.cshtml
    |   |-- RoleManager
    |   |   |-- Assign.cshtml
    |   |   |-- Index.cshtml
    |   |-- Shared
    |   |   |-- _Layout.cshtml
    |   |-- SysLogs
    |   |   |-- index.cshtml
    |   |-- SysMessages
    |   |   |-- index.cshtml
    |   |-- UserManager
    |   |   |-- ChangePassword.cshtml
    |   |   |-- Index.cshtml
    |   |   |-- Profile.cshtml
    |   |-- WmsInboundOrderTbls
    |       |-- index.cshtml
    |-- wwwroot
        |-- css
        |   |-- formpreview.css
        |   |-- images.css
        |   |-- login.css
        |   |-- main.css
        |   |-- treetable.css
        |-- js
            |-- bodyTab.js
            |-- bootstrap.js
            |-- cookie.js
            |-- droptree.js
            |-- dtree.js
            |-- flowlayout.js
            |-- iconPicker.js
            |-- index.js
            |-- leftNav.js
            |-- openauth.js
            |-- slimscroll.js
            |-- utils.js
            |-- vue.js
            |-- ztree.js
        |-- userJs
            |-- assignModule.js
            |-- assignResource.js
            |-- assignRole.js
            |-- categories.js
            |-- changePwd.js
            |-- dataprivilegerules.js
            |-- flowinstanceDetail.js
            |-- flowInstanceDisposed.js
            |-- flowInstanceEdit.js
            |-- flowInstances.js
            |-- flowInstanceWait.js
            |-- flowSchemeDesign.js
            |-- flowSchemePreview.js
            |-- flowSchemes.js
            |-- formEdit.js
            |-- forms.js
            |-- login.js
            |-- main.js
            |-- modules.js
            |-- nodeInfo.js
            |-- openjobs.js
            |-- orgs.js
            |-- preview.js
            |-- profile.js
            |-- resources.js
            |-- roles.js
            |-- syslogs.js
            |-- sysmessages.js
            |-- users.js
            |-- verification.js
            |-- wmsinboundordertbls.js
```