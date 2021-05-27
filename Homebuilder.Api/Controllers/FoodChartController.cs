using Homebuilder.Domain.Queries.Guids.Foods;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Guids.Enums;

namespace Homebuilder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FoodChartController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FoodChartController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetFoodChartData(MonthEnum month)
        {
            var model = new GetMonthFoodChartData.Query();
            model.Month = month;
            return Ok(await _mediator.Send(model));
        }
    }
}
