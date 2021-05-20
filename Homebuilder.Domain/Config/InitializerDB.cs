using Homebuilder.Domain.Entities;
using Homebuilder.Domain.Providers;
using Homebuilder.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Entities.Longs.Enums;
using Homebuilder.Domain.Repositories.Longs;

namespace Homebuilder.Domain.Config
{
    public static class InitializerDB
    {
        public async static void Initialize()
        {
            var serviceProvider = StaticServiceProvider.GetProvider();
            var toDoRepository = serviceProvider.GetService(typeof(IToDoTaskRepository)) as IToDoTaskRepository;
            var activityRepository = serviceProvider.GetService(typeof(IActivityRepository)) as IActivityRepository;

            var allTodos = (await toDoRepository.GetAll()).ToList();
            if (!allTodos.Any())
            {
                var res = new List<ToDoTask>
            {
                new ToDoTask {CreationDate=DateTime.UtcNow,ToDo = "Buy Windows",Description="#DE 8009 Description lorem ipsum lorem ipsum",Information="ABC",IsComppleted=false,State=State.HighPrice },
                new ToDoTask {CreationDate=DateTime.UtcNow,ToDo = "Find Contractors",Description="#DE 2100 Description lorem ipsum lorem ipsum",Information="Tommorow",IsComppleted=false,State=State.Medium },
                new ToDoTask {CreationDate=DateTime.UtcNow,ToDo = "Prints of plans",Description="#DE 1234 Description lorem ipsum lorem ipsum",Information="5 copies",IsComppleted=false,State=State.Final },
            };
                await toDoRepository.Add(res);
            }
            var activities = (await activityRepository.GetAll()).ToList();

            if (!activities.Any())
            {
                var activitiesToCreate = new List<Activity>
                {
                    new Activity{CreationDate=DateTime.UtcNow,ScheduledDate=DateTime.UtcNow.AddDays(2),Title="Survey Due", Description="365 Boyer Circle, Lafayette", Code="#DE80090"},
                    new Activity{CreationDate=DateTime.UtcNow.AddDays(-1),ScheduledDate=DateTime.UtcNow.AddDays(3),Title="Layla R. Hue Scheduled Site Visit", Description="365 Boyer Circle, Lafayette", Code="#DE80090"},
                    new Activity{CreationDate=DateTime.UtcNow.AddDays(-2),ScheduledDate=DateTime.UtcNow.AddDays(-2),Title="Deposit Invoice Paid", Description="$2,500.00", Code="#DE80090"},
                    new Activity{CreationDate=DateTime.UtcNow.AddDays(-4),ScheduledDate=DateTime.UtcNow.AddDays(4),Title="Contract Signed", Description="200 Simpson Dr., Berkeley", Code="#DE80090"},
                };
                await activityRepository.Add(activitiesToCreate);
            }
        }
    }
}