using System;

namespace OpenAuth.Repository.Domain
{
	/// <summary>
	/// 使用者ID
	/// </summary>
	public static class UserExt
	{
	    public static void  CheckPassword(this User user, string password)
	    {
	        if (user.Password != password)
	        {
	            throw  new Exception("密碼錯誤");
	        }
	    }

	}
} 