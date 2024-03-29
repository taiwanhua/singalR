using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using OpenAuth.Repository.Core;
using OpenAuth.Repository.Interface;
using Z.EntityFramework.Plus;

namespace OpenAuth.Repository
{
   public  class UnitWork<TDbContext>: IUnitWork<TDbContext> where TDbContext: DbContext
   {
       private TDbContext _context;

       public UnitWork(TDbContext context)
       {
           _context = context;
       }

       /// <summary>
       /// EF預設情況下，每呼叫一次SaveChanges()都會執行一個單獨的事務
       /// 本接口實現在一個事務中可以多次執行SaveChanges()方法
       /// </summary>
       public void ExecuteWithTransaction(Action action)
       {
           using (IDbContextTransaction transaction = _context.Database.BeginTransaction())
           {
               try
               {
                   action();
                   transaction.Commit();
               }
               catch (Exception ex)
               {
                   transaction.Rollback();
                   throw ex;
               }
           }
       }

       /// <summary>
       /// 返回DbContext,用於多執行緒等極端情況
       /// </summary>
       public DbContext GetDbContext()
       {
           return _context;
       }

        /// <summary>
        /// 根據過濾條件，獲取記錄
        /// </summary>
        /// <param name="exp">The exp.</param>
        public IQueryable<T> Find<T>(Expression<Func<T, bool>> exp = null) where T : class 
        {
            return Filter(exp);
        }

        public bool Any<T>(Expression<Func<T, bool>> exp) where T : class
        {
            return _context.Set<T>().Any(exp);
        }

        /// <summary>
        /// 查詢單個
        /// </summary>
        public T FirstOrDefault<T>(Expression<Func<T, bool>> exp) where T:class 
        {
            return _context.Set<T>().AsNoTracking().FirstOrDefault(exp);
        }

        /// <summary>
        /// 得到分頁記錄
        /// </summary>
        /// <param name="pageindex">The pageindex.</param>
        /// <param name="pagesize">The pagesize.</param>
        /// <param name="orderby">排序，格式如："Id"/"Id descending"</param>
        public IQueryable<T> Find<T>(int pageindex, int pagesize, string orderby = "", Expression<Func<T, bool>> exp = null) where T : class
        {
            if (pageindex < 1) pageindex = 1;
            if (string.IsNullOrEmpty(orderby))
                orderby = "Id descending";

            return Filter(exp).OrderBy(orderby).Skip(pagesize * (pageindex - 1)).Take(pagesize);
        }

        /// <summary>
        /// 根據過濾條件獲取記錄數
        /// </summary>
        public int Count<T>(Expression<Func<T, bool>> exp = null) where T : class
        {
            return Filter(exp).Count();
        }

        /// <summary>
        /// 新增對象，如果Id為空，則會自動建立預設Id
        /// </summary>
        public void Add<T>(T entity) where T : BaseEntity
        {
            if (entity.KeyIsNull())
            {
                entity.GenerateDefaultKeyVal();
            }
            _context.Set<T>().Add(entity);
        }

        /// <summary>
        /// 批量新增對象，如果對像Id為空，則會自動建立預設Id
        /// </summary>
        public void BatchAdd<T>(T[] entities) where T : BaseEntity
        {
            foreach (var entity in entities)
            {
                if (entity.KeyIsNull())
                {
                    entity.GenerateDefaultKeyVal();
                }
            }
            _context.Set<T>().AddRange(entities);
        }

        public void Update<T>(T entity) where T:class
        {
            var entry = this._context.Entry(entity);
            entry.State = EntityState.Modified;

            //如果數據沒有發生變化
            if (!this._context.ChangeTracker.HasChanges())
            {
                entry.State = EntityState.Unchanged;
            }

        }

        public void Delete<T>(T entity) where T:class
        {
            _context.Set<T>().Remove(entity);
        }

        /// <summary>
        /// 實現按需要只更新部分更新
        /// <para>如：Update&lt;User&gt;(u =>u.Id==1,u =>new User{Name="ok"})</para>
        /// <para>該方法內部自動呼叫了SaveChanges()，需要ExecuteWithTransaction配合才能實現事務控制</para>
        /// </summary>
        /// <param name="where">更新條件</param>
        /// <param name="entity">更新后的實體</param>
        public void Update<T>(Expression<Func<T, bool>> where, Expression<Func<T, T>> entity) where T:class
        {
            _context.Set<T>().Where(where).Update(entity);
        }

        /// <summary>
        /// 批量刪除
        /// <para>該方法內部自動呼叫了SaveChanges()，需要ExecuteWithTransaction配合才能實現事務控制</para>
        /// </summary>
        public virtual void Delete<T>(Expression<Func<T, bool>> exp) where T : class
        {
            _context.Set<T>().Where(exp).Delete();
        }

        public void Save()
        {
            try
            {
                var entities = _context.ChangeTracker.Entries()
                    .Where(e => e.State == EntityState.Added
                                || e.State == EntityState.Modified)
                    .Select(e => e.Entity);

                foreach (var entity in entities)
                {
                    var validationContext = new ValidationContext(entity);
                    Validator.ValidateObject(entity, validationContext, validateAllProperties: true);
                }

                _context.SaveChanges();
            }
            catch (ValidationException exc)
            {
                Console.WriteLine($"{nameof(Save)} validation exception: {exc?.Message}");
                throw (exc.InnerException as Exception ?? exc);
            }
            catch (Exception ex) //DbUpdateException 
            {
                throw (ex.InnerException as Exception ?? ex);
            }
          
        }

        private IQueryable<T> Filter<T>(Expression<Func<T, bool>> exp) where T : class
        {
            var dbSet = _context.Set<T>().AsNoTracking().AsQueryable();
            if (exp != null)
                dbSet = dbSet.Where(exp);
            return dbSet;
        }

       public int ExecuteSql(string sql)
       {
            return _context.Database.ExecuteSqlRaw(sql);
        }

       public IQueryable<T> FromSql<T>(string sql, params object[] parameters) where T : class
       {
           return _context.Set<T>().FromSqlRaw(sql, parameters);
       }
        
       public IQueryable<T> Query<T>(string sql, params object[] parameters) where T : class
       {
           return _context.Query<T>().FromSqlRaw(sql, parameters);
       }
       
        #region 非同步實現
        
        /// <summary>
        /// 非同步執行sql
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public async Task<int> ExecuteSqlRawAsync(string sql)
        {
            return await _context.Database.ExecuteSqlRawAsync(sql);
        }
        
       
        /// <summary>
        /// 非同步儲存
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task<int> SaveAsync()
        {
            try
            {
                var entities = _context.ChangeTracker.Entries()
                    .Where(e => e.State == EntityState.Added
                                || e.State == EntityState.Modified)
                    .Select(e => e.Entity);

                foreach (var entity in entities)
                {
                    var validationContext = new ValidationContext(entity);
                    Validator.ValidateObject(entity, validationContext, validateAllProperties: true);
                }

                return await _context.SaveChangesAsync();
            }
            catch (ValidationException exc)
            {
                Console.WriteLine($"{nameof(Save)} validation exception: {exc?.Message}");
                throw (exc.InnerException as Exception ?? exc);
            }
            catch (Exception ex) //DbUpdateException 
            {
                throw (ex.InnerException as Exception ?? ex);
            }
        }
        
        /// <summary>
        /// 根據過濾條件獲取記錄數
        /// </summary>
        public async Task<int> CountAsync<T>(Expression<Func<T, bool>> exp = null) where T : class
        {
            return await Filter(exp).CountAsync();
        }
        
        public async Task<bool> AnyAsync<T>(Expression<Func<T, bool>> exp) where T : class
        {
            return await _context.Set<T>().AnyAsync(exp);
        }

        /// <summary>
        /// 查詢單個，且不被上下文所跟蹤
        /// </summary>
        public async Task<T> FirstOrDefaultAsync<T>(Expression<Func<T, bool>> exp) where T : class
        {
            return await _context.Set<T>().AsNoTracking().FirstOrDefaultAsync(exp);
        }

        #endregion
    }
}
