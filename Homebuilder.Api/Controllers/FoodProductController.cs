using Homebuilder.Domain.Commands.Guids.Foods;
using Homebuilder.Domain.Queries.Guids.Foods;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Homebuilder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FoodProductController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FoodProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllFoodProducts.Query()));
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] UpdateFoodProductCommand.Command command)
        {
            if (command == null)
            {
                throw new Exception("Invalid model");
            }
            await _mediator.Send(command);

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(string id)
        {
            await _mediator.Send(new DeleteFoodProductCommand.Command { Id = id });
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateUtilityBillCommand.Command view)
        {
            if (view is null)
            {
                throw new Exception("Invalid model");
            }
            await _mediator.Send(view);

            return Ok();
        }
    }
}
