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
    public class CreateUtilityBillCommand
    {
        public class Command : IRequest
        {
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
                await _repository.Add(MapUtilityBillViewToModel(request));
            }

            private UtilityBill MapUtilityBillViewToModel(Command command)
            {
                if (!Enum.TryParse(command.Name.ToString(), out UtilityBillName name))
                {
                    throw new Exception("Can't parse UtilityBill Name");
                } 
                var res = new UtilityBill();
                res.Name = name;
                res.Month = command.Month;
                res.Price = command.Price;
                res.Year = command.Year;
                return res;
            }
        }
    }
}
