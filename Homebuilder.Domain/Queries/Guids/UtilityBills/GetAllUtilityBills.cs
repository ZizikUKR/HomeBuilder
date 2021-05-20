using Homebuilder.Domain.Entities.Guids;
using Homebuilder.Domain.Repositories.Guids;
using Homebuilder.Domain.Views.Guids.Enums;
using Homebuilder.Domain.Views.Guids.UtilityBills;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Queries.Guids.UtilityBills
{
    public class GetAllUtilityBills
    {
        public class Query : IRequest<GetAllUtilityBillsView> { }

        public class Handler : IRequestHandler<Query, GetAllUtilityBillsView>
        {
            private readonly IUtilityBillRepository _repository;

            public Handler(IUtilityBillRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetAllUtilityBillsView> Handle(Query request, CancellationToken cancellationToken)
            {
                var utilityBills = await _repository.GetAll();

                var res = new GetAllUtilityBillsView();
                res.Items = utilityBills.Select(p => MapUtilityBillToView(p)).ToList();

                return res;
            }

            public UtilityBillGetAllViewItem MapUtilityBillToView(UtilityBill model)
            {
                var res = new UtilityBillGetAllViewItem();

                if (!Enum.TryParse(model.Name.ToString(), out UtilityBillNameEnumView state))
                {
                    throw new Exception("Can't parse UtilityBill Name");
                }

                res.Name = state;
                res.CreationDate = model.CreationDate;
                res.Id = model.Id;
                res.Month = model.Month;
                res.Price = model.Price;
                res.Year = model.Year;
                return res;
            }
        }
    }
}
