using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Infrastructure.Extensions;

namespace Infrastructure.Helpers
{
    public class FileHelper
    {
        private static object _filePathObj = new object();

        /// <summary>
        /// 通過迭代器讀取平面檔案行內容(必須是帶有\r\n換行的檔案,百萬行以上的內容讀取效率存在問題,適用於100M左右檔案，行100W內，超出的會有卡頓)
        /// </summary>
        /// <param name="fullPath">檔案全路徑</param>
        /// <param name="page">分頁頁數</param>
        /// <param name="pageSize">分頁大小</param>
        /// <param name="seekEnd"> 是否最後一行向前讀取,預設從前向後讀取</param>
        /// <returns></returns>
        public static IEnumerable<string> ReadPageLine(string fullPath, int page, int pageSize, bool seekEnd = false)
        {
            if (page <= 0)
            {
                page = 1;
            }
            fullPath = StringExtension.ReplacePath(fullPath);
            var lines = File.ReadLines(fullPath, Encoding.UTF8);
            if (seekEnd)
            {
                int lineCount = lines.Count();
                int linPageCount = (int)Math.Ceiling(lineCount / (pageSize * 1.00));
                //超過總頁數，不處理
                if (page > linPageCount)
                {
                    page = 0;
                    pageSize = 0;
                }
                else if (page == linPageCount)//最後一頁，取最後一頁剩下所有的行
                {
                    pageSize = lineCount - (page - 1) * pageSize;
                    if (page == 1)
                    {
                        page = 0;
                    }
                    else
                    {
                        page = lines.Count() - page * pageSize;
                    }
                }
                else
                {
                    page = lines.Count() - page * pageSize;
                }
            }
            else
            {
                page = (page - 1) * pageSize;
            }
            lines = lines.Skip(page).Take(pageSize);

            var enumerator = lines.GetEnumerator();
            int count = 1;
            while (enumerator.MoveNext() || count <= pageSize)
            {
                yield return enumerator.Current;
                count++;
            }
            enumerator.Dispose();
        }
        public static bool FileExists(string path)
        {
            return File.Exists(StringExtension.ReplacePath(path));
        }

        public static string GetCurrentDownLoadPath()
        {
            return ("Download\\").MapPath();
        }

        public static bool DirectoryExists(string path)
        {
            return Directory.Exists(StringExtension.ReplacePath(path));
        }


        public static string Read_File(string fullpath, string filename, string suffix)
        {
            return ReadFile((fullpath + "\\" + filename + suffix).MapPath());
        }
        public static string ReadFile(string fullName)
        {
            //  Encoding code = Encoding.GetEncoding(); //Encoding.GetEncoding("gb2312");
            string temp = fullName.MapPath().ReplacePath();
            string str = "";
            if (!File.Exists(temp))
            {
                return str;
            }
            StreamReader sr = null;
            try
            {
                sr = new StreamReader(temp);
                str = sr.ReadToEnd(); // 讀取檔案
            }
            catch { }
            sr?.Close();
            sr?.Dispose();
            return str;
        }



        /// <summary>
        /// 取後綴名
        /// </summary>
        /// <param name="filename">檔名</param>
        /// <returns>.gif|.html格式</returns>
        public static string GetPostfixStr(string filename)
        {
            int start = filename.LastIndexOf(".");
            int length = filename.Length;
            string postfix = filename.Substring(start, length - start);
            return postfix;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="path">路徑 </param>
        /// <param name="fileName">檔名</param>
        /// <param name="content">寫入的內容</param>
        /// <param name="appendToLast">是否將內容新增到未尾,預設不新增</param>
        public static void WriteFile(string path, string fileName, string content, bool appendToLast = false)
        {
            path = StringExtension.ReplacePath(path);
            fileName = StringExtension.ReplacePath(fileName);
            if (!Directory.Exists(path))//如果不存在就建立file資料夾
                Directory.CreateDirectory(path);

            using (FileStream stream = File.Open(Path.Combine(path, fileName), FileMode.OpenOrCreate, FileAccess.Write))
            {
                byte[] by = Encoding.Default.GetBytes(content);
                if (appendToLast)
                {
                    stream.Position = stream.Length;
                }
                else
                {
                    stream.SetLength(0);
                }
                stream.Write(by, 0, by.Length);
            }
        }



        /// <summary>
        /// 追加檔案
        /// </summary>
        /// <param name="Path">檔案路徑</param>
        /// <param name="strings">內容</param>
        public static void FileAdd(string Path, string strings)
        {
            StreamWriter sw = File.AppendText(StringExtension.ReplacePath(Path));
            sw.Write(strings);
            sw.Flush();
            sw.Close();
            sw.Dispose();
        }


        /// <summary>
        /// 拷貝檔案
        /// </summary>
        /// <param name="OrignFile">原始檔案</param>
        /// <param name="NewFile">新檔案路徑</param>
        public static void FileCoppy(string OrignFile, string NewFile)
        {
            File.Copy(StringExtension.ReplacePath(OrignFile), StringExtension.ReplacePath(NewFile), true);
        }


        /// <summary>
        /// 刪除檔案
        /// </summary>
        /// <param name="Path">路徑</param>
        public static void FileDel(string Path)
        {
            File.Delete(StringExtension.ReplacePath(Path));
        }

        /// <summary>
        /// 移動檔案
        /// </summary>
        /// <param name="OrignFile">原始路徑</param>
        /// <param name="NewFile">新路徑</param>
        public static void FileMove(string OrignFile, string NewFile)
        {
            File.Move(StringExtension.ReplacePath(OrignFile), StringExtension.ReplacePath(NewFile));
        }

        /// <summary>
        /// 在當前目錄下建立目錄
        /// </summary>
        /// <param name="OrignFolder">當前目錄</param>
        /// <param name="NewFloder">新目錄</param>
        public static void FolderCreate(string OrignFolder, string NewFloder)
        {
            Directory.SetCurrentDirectory(StringExtension.ReplacePath(OrignFolder));
            Directory.CreateDirectory(StringExtension.ReplacePath(NewFloder));
        }

        /// <summary>
        /// 建立資料夾
        /// </summary>
        /// <param name="Path"></param>
        public static void FolderCreate(string Path)
        {
            // 判斷目標目錄是否存在如果不存在則新建之
            if (!Directory.Exists(StringExtension.ReplacePath(Path)))
                Directory.CreateDirectory(StringExtension.ReplacePath(Path));
        }


        public static void FileCreate(string Path)
        {
            FileInfo CreateFile = new FileInfo(StringExtension.ReplacePath(Path)); //建立檔案 
            if (!CreateFile.Exists)
            {
                FileStream FS = CreateFile.Create();
                FS.Close();
            }
        }
        /// <summary>
        /// 遞迴刪除資料夾目錄及檔案
        /// </summary>
        /// <param name="dir"></param>  
        /// <returns></returns>
        public static void DeleteFolder(string dir)
        {
            dir = StringExtension.ReplacePath(dir);
            if (Directory.Exists(dir)) //如果存在這個資料夾刪除之 
            {
                foreach (string d in Directory.GetFileSystemEntries(dir))
                {
                    if (File.Exists(d))
                        File.Delete(d); //直接刪除其中的檔案                        
                    else
                        DeleteFolder(d); //遞迴刪除子資料夾 
                }
                Directory.Delete(dir, true); //刪除已空資料夾                 
            }
        }


        /// <summary>
        /// 指定資料夾下面的所有內容copy到目標資料夾下面
        /// </summary>
        /// <param name="srcPath">原始路徑</param>
        /// <param name="aimPath">目標資料夾</param>
        public static void CopyDir(string srcPath, string aimPath)
        {
            try
            {
                aimPath = StringExtension.ReplacePath(aimPath);
                // 檢查目標目錄是否以目錄分割字元結束如果不是則新增之
                if (aimPath[aimPath.Length - 1] != Path.DirectorySeparatorChar)
                    aimPath += Path.DirectorySeparatorChar;
                // 判斷目標目錄是否存在如果不存在則新建之
                if (!Directory.Exists(aimPath))
                    Directory.CreateDirectory(aimPath);
                // 得到源目錄的檔案列表，該裡面是包含檔案以及目錄路徑的一個陣列
                //如果你指向copy目標檔案下面的檔案而不包含目錄請使用下面的方法
                //string[] fileList = Directory.GetFiles(srcPath);
                string[] fileList = Directory.GetFileSystemEntries(StringExtension.ReplacePath(srcPath));
                //遍歷所有的檔案和目錄
                foreach (string file in fileList)
                {
                    //先當作目錄處理如果存在這個目錄就遞迴Copy該目錄下面的檔案

                    if (Directory.Exists(file))
                        CopyDir(file, aimPath + Path.GetFileName(file));
                    //否則直接Copy檔案
                    else
                        File.Copy(file, aimPath + Path.GetFileName(file), true);
                }
            }
            catch (Exception ee)
            {
                throw new Exception(ee.ToString());
            }
        }

        /// <summary>
        /// 獲取資料夾大小
        /// </summary>
        /// <param name="dirPath">資料夾路徑</param>
        /// <returns></returns>
        public static long GetDirectoryLength(string dirPath)
        {
            dirPath = StringExtension.ReplacePath(dirPath);
            if (!Directory.Exists(dirPath))
                return 0;
            long len = 0;
            DirectoryInfo di = new DirectoryInfo(dirPath);
            foreach (FileInfo fi in di.GetFiles())
            {
                len += fi.Length;
            }
            DirectoryInfo[] dis = di.GetDirectories();
            if (dis.Length > 0)
            {
                for (int i = 0; i < dis.Length; i++)
                {
                    len += GetDirectoryLength(dis[i].FullName);
                }
            }
            return len;
        }

        /// <summary>
        /// 獲取指定檔案詳細屬性
        /// </summary>
        /// <param name="filePath">檔案詳細路徑</param>
        /// <returns></returns>
        public static string GetFileAttibe(string filePath)
        {
            string str = "";
            filePath = StringExtension.ReplacePath(filePath);
            System.IO.FileInfo objFI = new System.IO.FileInfo(filePath);
            str += "詳細路徑:" + objFI.FullName + "<br>檔名稱:" + objFI.Name + "<br>檔案長度:" + objFI.Length.ToString() + "位元組<br>建立時間" + objFI.CreationTime.ToString() + "<br>最後訪問時間:" + objFI.LastAccessTime.ToString() + "<br>修改時間:" + objFI.LastWriteTime.ToString() + "<br>所在目錄:" + objFI.DirectoryName + "<br>副檔名:" + objFI.Extension;
            return str;
        }

    }
}
