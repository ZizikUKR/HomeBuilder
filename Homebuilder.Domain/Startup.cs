namespace Homebuilder.Domain
{
    public class Startup
    {
        public static void Configure(string connectionString)
        {
            DbUP.Update(connectionString);
        }
    }
}
