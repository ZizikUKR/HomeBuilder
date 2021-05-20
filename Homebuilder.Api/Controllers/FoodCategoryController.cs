using Homebuilder.Domain.Queries.Guids.Foods;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Homebuilder.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class FoodCategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public FoodCategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult> GetProductCreationData()
        {
            return Ok(await _mediator.Send(new GetProductCreationData.Query()));
        }
    }
}
