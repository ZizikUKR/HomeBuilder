using Microsoft.Data.Sqlite;

namespace Homebuilder.Domain
{
    public class Startup
    {
        public static void Configure(string connectionString)
        {
            //using var connection = new SqliteConnection("");

            DbUP.Update(connectionString);
        }
    }
}
