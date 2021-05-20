using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Homebuilder.Domain.Repositories.Guids;

namespace Homebuilder.Domain.Commands.Guids.UtilityBills
{
    public class DeleteUtilityBillCommand
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IUtilityBillRepository _repository;

            public Handler(IUtilityBillRepository repository)
            {
                _repository = repository;
            }
            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var utilityBill = await _repository.Get(request.Id);

                if (utilityBill is null)
                {
                    throw new Exception("Utility Bill doesn't exist");
                }

                await _repository.Delete(utilityBill);
            }
        }
    }
}
