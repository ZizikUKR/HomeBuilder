using Homebuilder.Domain.Entities.Longs;
using Homebuilder.Domain.Repositories.Longs;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Longs.Activities
{
    public class CreateActivityCommand
    {
        public class Command : IRequest
        {
            public DateTime ScheduledDate { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Code { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IActivityRepository _activityRepository;

            public Handler(IActivityRepository activityRepository)
            {
                _activityRepository = activityRepository;
            }
            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                await _activityRepository.Add(MapCreateViewToActivity(request));
            }

            private Activity MapCreateViewToActivity(Command activity)
            {
                var res = new Activity();
                res.Title = activity.Title;
                res.ScheduledDate = activity.ScheduledDate;
                res.Description = activity.Description;
                res.Code = activity.Code;

                return res;
            }
        }
    }
}
