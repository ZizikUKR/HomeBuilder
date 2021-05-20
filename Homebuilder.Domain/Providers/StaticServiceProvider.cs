using System;

namespace Homebuilder.Domain.Providers
{
    public static class StaticServiceProvider
    {
        private static IServiceProvider _serviceProvider { get; set; }

        public static IServiceProvider GetProvider()
        {
            return _serviceProvider;
        }
        public static void SetServiceProvider(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
    }
}
