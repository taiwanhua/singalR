//------------------------------------------------------------------------------
// <autogenerated>
//     This code was generated by a CodeSmith Template.
//
//     DO NOT MODIFY contents of this file. Changes to this
//     file will be lost if the code is regenerated.
//     Author:Yubao Li
// </autogenerated>
//------------------------------------------------------------------------------
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using OpenAuth.Repository.Core;

namespace OpenAuth.Repository.Domain
{
    /// <summary>
	/// 入庫通知單明細
	/// </summary>
    [Table("WmsInboundOrderDtbl")]
    public partial class WmsInboundOrderDtbl : Entity
    {
        public WmsInboundOrderDtbl()
        {
          this.AsnStatus= 0;
          this.GoodsId= string.Empty;
          this.GoodsBatch= string.Empty;
          this.QualityFlg= string.Empty;
          this.OrderNum= 0;
          this.InNum= 0;
          this.LeaveNum= 0;
          this.HoldNum= 0;
          this.ProdDate= string.Empty;
          this.ExpireDate= string.Empty;
          this.OwnerId= string.Empty;
          this.Remark= string.Empty;
          this.CreateTime= DateTime.Now;
          this.CreateUserId= string.Empty;
          this.CreateUserName= string.Empty;
          this.UpdateTime= DateTime.Now;
          this.UpdateUserId= string.Empty;
          this.UpdateUserName= string.Empty;
        }
        
        /// <summary>
        /// 訂單ID
        /// </summary>
        [Description("訂單ID")]
        [Browsable(false)]
        public string OrderId { get; set; }
        
        /// <summary>
        /// 含稅單價
        /// </summary>
        [Description("含稅單價")]
        public decimal? Price { get; set; }
        /// <summary>
        /// 無稅單價
        /// </summary>
        [Description("無稅單價")]
        public decimal? PriceNoTax { get; set; }
        /// <summary>
        /// 是否收貨中(0:非收貨中,1:收貨中)
        /// </summary>
        [Description("是否收貨中")]
        public bool InStockStatus { get; set; }
        /// <summary>
        /// 到貨狀況(SYS_GOODSARRIVESTATUS)
        /// </summary>
        [Description("到貨狀況")]
        public int AsnStatus { get; set; }
        /// <summary>
        /// 商品編號
        /// </summary>
        [Description("商品編號")]
        [Browsable(false)]
        public string GoodsId { get; set; }
        /// <summary>
        /// 商品批號
        /// </summary>
        [Description("商品批號")]
        public string GoodsBatch { get; set; }
        /// <summary>
        /// 品質(SYS_QUALITYFLAG)
        /// </summary>
        [Description("品質")]
        public string QualityFlg { get; set; }
        /// <summary>
        /// 通知數量
        /// </summary>
        [Description("通知數")]
        public decimal OrderNum { get; set; }
        /// <summary>
        /// 到貨數量
        /// </summary>
        [Description("到貨數")]
        public decimal InNum { get; set; }
        /// <summary>
        /// 剩餘數量
        /// </summary>
        [Description("剩餘數")]
        public decimal LeaveNum { get; set; }
        /// <summary>
        /// 占用數量
        /// </summary>
        [Description("占用數")]
        [Browsable(false)]
        
        public decimal HoldNum { get; set; }
        /// <summary>
        /// 生產日期
        /// </summary>
        [Description("生產日期")]
        public string ProdDate { get; set; }
        /// <summary>
        /// 失效日期
        /// </summary>
        [Description("失效日期")]
        public string ExpireDate { get; set; }
        /// <summary>
        /// 稅率
        /// </summary>
        [Description("稅率")]
        public decimal? TaxRate { get; set; }
        /// <summary>
        /// 貨主編號
        /// </summary>
        [Description("貨主編號")]
        [Browsable(false)]
        public string OwnerId { get; set; }
        /// <summary>
        /// 備註
        /// </summary>
        [Description("備註")]
        [Browsable(false)]
        public string Remark { get; set; }
        /// <summary>
        /// 建立時間
        /// </summary>
        [Description("建立時間")]
        public System.DateTime CreateTime { get; set; }
        /// <summary>
        /// 建立人ID
        /// </summary>
        [Description("建立人ID")]
        [Browsable(false)]
        public string CreateUserId { get; set; }
        /// <summary>
        /// 建立人
        /// </summary>
        [Description("建立人")]
        public string CreateUserName { get; set; }
        /// <summary>
        /// 最後更新時間
        /// </summary>
        [Description("最後更新")]
        public System.DateTime? UpdateTime { get; set; }
        /// <summary>
        /// 最後更新人ID
        /// </summary>
        [Description("最後更新人ID")]
        [Browsable(false)]
        public string UpdateUserId { get; set; }
        /// <summary>
        /// 最後更新人
        /// </summary>
        [Description("最後更新人")]
        public string UpdateUserName { get; set; }
    }
}