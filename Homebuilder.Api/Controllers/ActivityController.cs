using Homebuilder.Domain.Queries.Longs.Activities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Homebuilder.Domain.Commands.Longs.Activities;

namespace Homebuilder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivityController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllActivitiesQuery.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateActivityCommand.Command activity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Activity doesn't valid");
            }
            await _mediator.Send(activity);
            return Ok();
        }
    }
}
