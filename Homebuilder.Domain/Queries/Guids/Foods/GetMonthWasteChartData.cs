using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Guids.Enums;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Homebuilder.Domain.Views.Guids.Foods;
using MediatR;

namespace Homebuilder.Domain.Queries.Guids.Foods
{
    public class GetMonthWasteChartData
    {
        public class Query : IRequest<GetMonthWasteChartDataView>
        {
            public MonthEnum Month { get; set; }
        }

        public class Handler : IRequestHandler<Query, GetMonthWasteChartDataView>
        {
            private readonly IFoodWasteRepository _repository;

            public Handler(IFoodWasteRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetMonthWasteChartDataView> Handle(Query request, CancellationToken cancellationToken)
            {
                var res = new GetMonthWasteChartDataView();
                //int month = DateTime.UtcNow.Month;
                int year = DateTime.UtcNow.Year;

                var monthPrices = await _repository.GetMonthPrices(year);
                var currentMonthSpends = await _repository.GetCurrentMonthSpends(year, (int)request.Month);

                res.MonthPrices = monthPrices?.Select(p => p.MonthPrice).ToList();
                res.Months = monthPrices?.Select(p => p.Month.ToString()).ToList();

                res.CurrentMonthCategoryPrices = currentMonthSpends.Select(p => p.Price).ToList();
                res.CurrentMonthCategories = currentMonthSpends.Select(p => p.Name).ToList();

                return res;
            }
        }
    }
}
