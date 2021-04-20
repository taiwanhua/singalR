module.exports = {
    title: 'OpenAuth.Core'
    ,description: '最好用的.net許可權工作流框架,最好用的.net core vue前後分離框架'
    ,head: [
      ['link', { rel: 'icon', href: '/logo.png' }]
    ]
    ,themeConfig : {
      lastUpdated: '最後更新時間', // string | boolean
      nav : [
        { text: '首頁', link: 'http://openauth.me/' , target:'_blank' },
          { text: 'OpenAuth.Core(.Net Core/.Net 5)', link: '/core/' },
          { text: 'OpenAuth.Net(.Net 4.5)', link: '/net/' },
          {
            text: '專案地址',
            ariaLabel: 'Proj Menu',
            items: [
              { text: 'gitee', link: 'https://gitee.com/yubaolee/OpenAuth.Core' , target:'_blank' },
              { text: 'github', link: 'https://github.com/yubaolee/OpenAuth.Core' , target:'_blank' }
            ]
          }
      ],
      sidebar: {
        '/core/': [
          ['','專案介紹']
          ,{
            title: '後端開發',   // 必要的
            path: 'start',      // 可選的, 標題的跳轉鏈接，應為絕對路徑且必須存在
            sidebarDepth: 1,    // 可選的, 預設值是 1
            collapsable: false, 
            children: [
              "start"
              ,"specialist"
              ,"deploy" 
              ,"devnew"
              ,"multidbs"
              ,"multitenant"
              ,"unitwork"
              ,"entity"
              ,"datavalidation"
              ,"log"
              ,"identity" 
              ,"job"
              ,"cache"
              ,"unittest"
            ]
          }
          ,{
            title: '許可權控制',   // 必要的
            sidebarDepth: 1,    // 可選的, 預設值是 1
            collapsable: false, 
            children: [
              'logininfo'
              ,'dataprivilege'
              ,'datapropertyrule'
              
            ]
          }
          ,{
            title: '工作流',   // 必要的
            sidebarDepth: 1,    // 可選的, 預設值是 1
            collapsable: false, 
            children: [
              'thirdparty'
            ]
          }
          ,{
            title: '前端開發',   // 必要的
            sidebarDepth: 1,    // 可選的, 預設值是 1
            collapsable: false, 
            children: [
              'wwwarchitect'
            ]
          }
          ,{
            title: '更新日誌',   // 必要的
            sidebarDepth: 1,    // 可選的, 預設值是 1
            collapsable: false, 
            children: [
              'changelog'
              ,'routineupdate'
            ]
          }
          ,"faq" 
        ],
  
        '/net/': [
          ['','專案介紹']
          ,"start"  
          ,"deploy" 
          ,"devnew"
        ]
      }
  }
}