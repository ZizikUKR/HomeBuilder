using Homebuilder.Domain.Repositories.Guids.Foods;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Guids.Foods
{
    public class DeleteFoodProductCommand
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IFoodProductRepository _repository;

            public Handler(IFoodProductRepository repository)
            {
                _repository = repository;
            }
            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var foodProduct = await _repository.Get(request.Id);

                if (foodProduct is null)
                {
                    throw new Exception("Food product doesn't exist");
                }

                await _repository.Delete(foodProduct);
            }
        }
    }
}
