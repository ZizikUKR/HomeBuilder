using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using Homebuilder.Domain.Views.Longs.Activities;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Queries.Longs.Activities
{
    public class GetAllActivitiesQuery
    {
        public class Query: IRequest<GetAllActivityView> { }

        public class Handler : IRequestHandler<Query, GetAllActivityView>
        {
            private readonly IActivityRepository _activityRepository;

            public Handler(IActivityRepository activityRepository)
            {
                _activityRepository = activityRepository;
            }
            public async Task<GetAllActivityView> Handle(Query request, CancellationToken cancellationToken)
            {
                IEnumerable<Activity> activities = await _activityRepository.GetAll();

                var res = new GetAllActivityView();
                res.Activities = activities.Select(p => MapActivityToGetAllView(p)).ToList();

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
}
