using FluentValidation;
using FluentValidation.AspNetCore;
using Homebuilder.Api.Middlewares;
using Homebuilder.Domain.Config;
using Homebuilder.Domain.Providers;
using Homebuilder.Domain.Repositories.Guids;
using Homebuilder.Domain.Repositories.Longs;
using Homebuilder.Domain.Validators.Longs.Activities;
using Homebuilder.Domain.Validators.Longs.ToDos;
using Homebuilder.Domain.Views.Longs.Activities;
using Homebuilder.Domain.Views.Longs.Todos;
using Homebuilder.Infrastructure.Repositories.Guids;
using Homebuilder.Infrastructure.Repositories.Longs;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using Homebuilder.Domain.Repositories.Guids.Foods;

namespace Homebuilder.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
           // services.AddRazorPages();//.AddFluentValidation();
            services.AddMvc(setup => {
                //...mvc setup...
            }).AddFluentValidation();
            //var connectionString = Configuration.GetConnectionString("DefaultConnection");
            var connectionString = Configuration.GetConnectionString("SqliteDB");
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Homebuilder API", Version = "v1" });
                c.CustomSchemaIds(i => i.FullName);
            });
            services.AddSwaggerGen();
            Domain.Startup.Configure(connectionString);
            //services.AddTransient<IToDoService, ToDoService>();
            //services.AddTransient<IActivityService, ActivityService>();

            ConfigureValidators(services);

            var assembly = AppDomain.CurrentDomain.Load("Homebuilder.Domain");
            services.AddMediatR(assembly);

            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "wwwroot";
            //});
            ConfigureCors(services, Configuration);
            ConfigureRepositories(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            StaticServiceProvider.SetServiceProvider(serviceProvider);

            loggerFactory.AddFile(Configuration.GetSection("Logging"));
            app.UseHttpStatusCodeExceptionMiddleware();
            app.UseCors("OriginPolicy");
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Homebuilder API");

            });
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //app.UseSpaStaticFiles();
            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "wwwroot";
            //    #if Debug
            //    if (env.IsDevelopment())
            //    {
            //        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
            //    }
            //    #endif
            //});
            InitializerDB.Initialize();
        }

        public static void ConfigureCors(IServiceCollection services, IConfiguration configuration)
        {
            IConfigurationSection corsOptions = configuration.GetSection("Cors");
            string origins = corsOptions["Origins"];
            services.AddCors(options =>
            {
                options.AddPolicy("OriginPolicy", builder =>
                {
                    builder.WithOrigins(origins.Split(",", StringSplitOptions.RemoveEmptyEntries).ToArray())
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
        }

        private void ConfigureRepositories(IServiceCollection services)
        {
            services.AddTransient<IToDoTaskRepository, ToDoTaskRepository>();
            services.AddTransient<IActivityRepository, ActivityRepository>();

            services.AddTransient<IUtilityBillRepository, UtilityBillRepository>();
            services.AddTransient<IFoodWasteRepository, FoodWasteRepository>();
            services.AddTransient<IFoodProductRepository, FoodProductRepository>();
            services.AddTransient<IFoodCategoryRepository, FoodCategoryRepository>();
        }

        private void ConfigureValidators(IServiceCollection services)
        {
            services.AddTransient<IValidator<CreateActivity>, CreateActivityValidator>();
            services.AddTransient<IValidator<CreateToDoView>, CreateToDoValidator>();
        }
    }
}