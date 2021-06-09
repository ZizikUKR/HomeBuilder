using Homebuilder.Domain.Entities.Guids.Enums;
using Homebuilder.Domain.Repositories.Guids;
using Homebuilder.Domain.Views.Guids.UtilityBills;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Queries.Guids.UtilityBills
{
    public class GetUtilityBillChartsData
    {
        public class Query : IRequest<GetUtilityBillChartsDataView>
        {
            public MonthEnum Month { get; set; }
        }

        public class Handler : IRequestHandler<Query, GetUtilityBillChartsDataView>
        {
            private readonly IUtilityBillRepository _repository;

            public Handler(IUtilityBillRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetUtilityBillChartsDataView> Handle(Query request, CancellationToken cancellationToken)
            {
                var res = new GetUtilityBillChartsDataView();
                int year = DateTime.UtcNow.Year;

                var monthPrices = await _repository.GetMonthPrices(year);
                var currentMonthSpends = await _repository.GetCurrentMonthSpends(year, (int)request.Month);

                res.MonthPrices = monthPrices?.Select(p => p.MonthPrice).ToList();
                res.Months = monthPrices?.Select(p => p.Month.ToString()).ToList();

                res.CurrentMonthCategoryPrices = currentMonthSpends.Select(p => p.Price).ToList();
                res.CurrentMonthCategories = currentMonthSpends.Select(p => p.Name.ToString()).ToList();

                return res;
            }
        }
    }
}
