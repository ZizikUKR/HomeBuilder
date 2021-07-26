using DbUp;
using System.Reflection;

namespace Homebuilder.Domain
{
    public class DbUP
    {
        public static void Update(string connString)
        {
            var assemblyName = Assembly.GetExecutingAssembly();
            var upgrader = DeployChanges.To
                .SQLiteDatabase(connString)
                .WithScriptsEmbeddedInAssembly(assemblyName)
                .LogToAutodetectedLog()
                .Build();
            var result = upgrader.PerformUpgrade();
        }
    }
}
