// ***********************************************************************
// Assembly         : OpenAuth.Domain
// Author           : yubaolee
// Created          : 10-25-2015
//
// Last Modified By : yubaolee
// Last Modified On : 10-25-2015
// ***********************************************************************
// <copyright file="IRepository.cs" company="www.cnblogs.com/yubaolee">
//     Copyright (c) www.cnblogs.com/yubaolee. All rights reserved.
// </copyright>
// <summary>倉儲接口</summary>
// ***********************************************************************

using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace OpenAuth.Repository.Interface
{
    public interface IRepository<T,TDbContext> where T : class where TDbContext: DbContext
    {
        /// <summary>
        /// 返回一個單獨的實體，如果記錄多於1個則取第一個
        /// </summary>
        T FirstOrDefault(Expression<Func<T, bool>> exp = null);
        /// <summary>
        /// 判斷指定條件的記錄是否存在
        /// </summary>
        bool Any(Expression<Func<T, bool>> exp);
        IQueryable<T> Find(Expression<Func<T, bool>> exp = null);
        IQueryable<T> Find(int pageindex = 1, int pagesize = 10, string orderby = "",
            Expression<Func<T, bool>> exp = null);
        int Count(Expression<Func<T, bool>> exp = null);
        void Add(T entity);
        void BatchAdd(T[] entities);
        /// <summary>
        /// 更新一個實體的所有屬性
        /// </summary>
        void Update(T entity);
        void Delete(T entity);


        /// <summary>
        /// 實現按需要只更新部分更新
        /// <para>如：Update(u =>u.Id==1,u =>new User{Name="ok"});</para>
        /// </summary>
        /// <param name="where">更新條件</param>
        /// <param name="entity">更新后的實體</param>
        void Update(Expression<Func<T, bool>> where, Expression<Func<T, T>> entity);

        /// <summary>
        /// 批量刪除
        /// </summary>
        void Delete(Expression<Func<T, bool>> exp);

        void Save();

        int ExecuteSqlRaw(string sql);

        /// <summary>
        /// 使用SQL指令碼查詢
        /// </summary>
        /// <typeparam name="T"> T為資料庫實體</typeparam>
        /// <returns></returns>
        IQueryable<T> FromSql(string sql, params object[] parameters);

        /// <summary>
        /// 使用SQL指令碼查詢
        /// </summary>
        /// <typeparam name="T"> T為非資料庫實體，需要在DbContext中增加對應的DbQuery</typeparam>
        /// <returns></returns>
        IQueryable<T> Query(string sql, params object[] parameters);


        #region 非同步接口

        Task<int> ExecuteSqlRawAsync(string sql);
        Task<int> AddAsync(T entity);
        Task<int> BatchAddAsync(T[] entities);
        Task<int> UpdateAsync(T entity);
        Task<int> DeleteAsync(T entity);
        Task<int> SaveAsync();
        Task<int> CountAsync(Expression<Func<T, bool>> exp = null);
        Task<bool> AnyAsync(Expression<Func<T, bool>> exp);
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> exp);

        #endregion
    }
}