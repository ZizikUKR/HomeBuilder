using Homebuilder.Domain.Commands.Guids.UtilityBills;
using Homebuilder.Domain.Queries.Guids.UtilityBills;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Guids.Enums;
using Homebuilder.Domain.Queries.Guids.Foods;

namespace Homebuilder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UtilityBillController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UtilityBillController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllUtilityBills.Query()));
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] UpdateUtilityBillCommand.Command command)
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
            await _mediator.Send(new DeleteUtilityBillCommand.Command { Id = id });
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

        [HttpGet]
        public async Task<ActionResult> GetChartsData(MonthEnum month)
        {
            var model = new GetUtilityBillChartsData.Query();
            model.Month = month;
            return Ok(await _mediator.Send(model));
        }
    }
}
