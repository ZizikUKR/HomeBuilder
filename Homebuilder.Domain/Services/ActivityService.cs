using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using Homebuilder.Domain.Services.Longs.Interfaces;
using Homebuilder.Domain.Views.Longs.Activities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Services.Longs
{
    public class ActivityService : IActivityService
    {
        private readonly IActivityRepository _activityRepository;

        public ActivityService(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }
        public async Task<GetAllActivityView> GetAll()
        {
            IEnumerable<Activity> activities = await _activityRepository.GetAll();

            var res = new GetAllActivityView();
            res.Activities = activities.Select(p => MapActivityToGetAllView(p)).ToList();

            return res;
        }
        public async Task Create(CreateActivity activity)
        {
            await _activityRepository.Add(MapCreateViewToActivity(activity));
        }

        private Activity MapCreateViewToActivity(CreateActivity activity)
        {
            var res = new Activity();
            res.Title = activity.Title;
            res.ScheduledDate = DateTime.Parse(activity.ScheduledDate);
            res.Description = activity.Description;
            res.Code = activity.Code;

            return res;
        }
        private ActivityGetAllViewItem MapActivityToGetAllView(Activity activity)
        {
            var res = new ActivityGetAllViewItem();
            res.Code = activity.Code;
            res.id = activity.id;
            res.CreationDate = activity.CreationDate.ToString();
            res.ScheduledDate = activity.ScheduledDate.ToString();
            res.Title = activity.Title;
            res.Description = activity.Description;

            return res;
        }
    }
}
