//------------------------------------------------------------------------------
// <autogenerated>
//     This code was generated by a CodeSmith Template.
//
//     DO NOT MODIFY contents of this file. Changes to this
//     file will be lost if the code is regenerated.
//     Author:Yubao Li
// </autogenerated>
//------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations.Schema;

namespace OpenAuth.App.Request
{
    /// <summary>
	/// 分類型別
	/// </summary>
    [Table("CategoryType")]
    public partial class AddOrUpdateCategoryTypeReq 
    {

        /// <summary>
        /// 分類表ID
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// 名稱
        /// </summary>
        public string Name { get; set; }
    }
}