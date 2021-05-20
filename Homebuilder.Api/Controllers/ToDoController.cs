using Homebuilder.Domain.Commands.Longs.ToDos;
using Homebuilder.Domain.Queries.Longs.ToDos;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Homebuilder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ToDoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllTodosQuery.Query()));
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] UpdateToDoCommand.Command command)
        {
            if (command == null)
            {
                throw new Exception("Invalid model");
            }
            await _mediator.Send(command);

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            if (id < 0)
            {
                throw new Exception("Invalid model");
            }
            await _mediator.Send(new DeleteToDoCommand.Command { Id = id });
            return Ok();
        }
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateToDoCommand.Command view)
        {
            if (view == null)
            {
                throw new Exception("Invalid model");
            }
            await _mediator.Send(view);

            return Ok();
        }
    }
}
