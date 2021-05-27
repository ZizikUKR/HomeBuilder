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
    public class GetMonthFoodChartData
    {
        public class Query : IRequest<GetMonthFoodChartDataView>
        {
            public MonthEnum Month { get; set; }
        }

        public class Handler : IRequestHandler<Query, GetMonthFoodChartDataView>
        {
            private readonly IFoodProductRepository _repository;

            public Handler(IFoodProductRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetMonthFoodChartDataView> Handle(Query request, CancellationToken cancellationToken)
            {
                var res = new GetMonthFoodChartDataView();
                //int month = DateTime.UtcNow.Month;
                int year = DateTime.UtcNow.Year;

                var monthPrices = await _repository.GetMonthPrices(year);
                var currentMonthSpends = await _repository.GetCurrentMonthSpends(year, (int)request.Month);

                res.MonthPrices = monthPrices?.Select(p => p.MonthPrice).ToList();
                res.Months = monthPrices?.Select(p => p.Month.ToString()).ToList();

                res.CurrentMontCategoryPrices = currentMonthSpends.Select(p => p.Price).ToList();
                res.CurrentMonthCategories = currentMonthSpends.Select(p => p.Name).ToList();

                return res;
            }
        }
    }
}
