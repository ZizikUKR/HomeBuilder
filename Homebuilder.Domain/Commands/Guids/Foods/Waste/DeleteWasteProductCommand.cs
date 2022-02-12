using Homebuilder.Domain.Repositories.Guids.Foods;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Guids.Foods
{
    public class DeleteWasteProductCommand
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IFoodWasteRepository _repository;

            public Handler(IFoodWasteRepository repository)
            {
                _repository = repository;
            }
            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var foodProduct = await _repository.Get(request.Id);

                if (foodProduct is null)
                {
                    throw new Exception("Waste product doesn't exist");
                }

                await _repository.Delete(foodProduct);
            }
        }
    }
}
