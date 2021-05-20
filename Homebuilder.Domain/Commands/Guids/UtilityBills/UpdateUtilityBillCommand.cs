using Homebuilder.Domain.Entities.Guids;
using Homebuilder.Domain.Entities.Guids.Enums;
using Homebuilder.Domain.Repositories.Guids;
using Homebuilder.Domain.Views.Guids.Enums;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Guids.UtilityBills
{
    public class UpdateUtilityBillCommand
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public int Year { get; set; }
            public decimal Price { get; set; }
            public int Month { get; set; }
            public UtilityBillNameEnumView Name { get; set; }
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
                    throw new Exception("Utility Bill doesn't exist!");
                }

                MapUtilityBillViewToModel(utilityBill,request);
                await _repository.Update(utilityBill);
            }

            private void MapUtilityBillViewToModel(UtilityBill bill, Command request)
            {
                if (!Enum.TryParse(request.Name.ToString(), out UtilityBillName name))
                {
                    throw new Exception("Can't parse UtilityBill Name");
                }

                bill.Name = name;
                bill.Price = request.Price;
                bill.Month = request.Month;
                bill.Year = request.Year;
            }
        }
    }
}
