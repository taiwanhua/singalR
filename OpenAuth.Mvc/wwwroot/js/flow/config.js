/** 該檔案僅供參考，不隨其它JS檔案一起打包發布 **/
/**
 * 全域性的控制元件顏色自定義設定
 */
GooFlow.color={
  main:"#20A0FF",
  font:"#15428B",
  node:"#C0CCDA",
  line:"#1D8CE0",
  lineFont:"#ff6600",
  mark:"#ff8800",
  mix:"#B6F700",
  mixFont:"#777"
};
/**
 * 1.3版本新增的控制元件操作按鈕的title提示設定
 * 取代setNodeRemarks方法，採用更靈活的註釋配置
 */
//左邊工具欄按鈕的title提示設定，每個key名與初始化配置中相應按鈕的型別名相同
GooFlow.remarks.toolBtns={
    cursor:"選擇指針",
    direct:"結點連線",
    dashed:"關聯虛線",
    start:"入口結點",
    "end":"結束結點",
    "task":"任務結點",
    node:"自動結點",
    chat:"決策結點",
    state:"狀態結點",
    plug:"附加外掛",
    fork:"分支結點",
    join:"聯合結點",
    complex:"複合結點",
    group:"組織劃分框編輯開關"
};
//頂部標題欄按鈕的title提示設定，每個key名與初始化配置中相應按鈕的型別名相同
GooFlow.remarks.headBtns={
    'new':"新建流程",
    open:"打開流程",
    save:"儲存結果",
    undo:"撤銷",
    redo:"重做",
    reload:"重新整理流程",
    print:"列印流程圖"
};
//工作區域面積擴充套件按鈕的title提示設定
GooFlow.remarks.extendRight="工作區向右擴充套件";
GooFlow.remarks.extendBottom="工作區向下擴充套件";