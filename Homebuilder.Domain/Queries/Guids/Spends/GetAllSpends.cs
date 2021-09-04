using Homebuilder.Domain.Entities.Guids.Spends;
using Homebuilder.Domain.Helpers;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Homebuilder.Domain.Views;
using Homebuilder.Domain.Views.Guids.Foods;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Queries.Guids.Spends
{
    public class GetAllSpends
    {
        public class Query : PagedRequest, IRequest<GetAllSpendsView>
        {
            public string Category { get; set; }
            public int Month { get; set; }
        }

        public class Handler : IRequestHandler<Query, GetAllSpendsView>
        {
            private readonly ISpendRepository _repository;

            public Handler(ISpendRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetAllSpendsView> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentYear = DateTime.UtcNow.Year;
                int skippedItems = PaginationHelper.CalculateSkiptedItems(request.Page, request.PageSize);

                var foodProducts =
                    await _repository.GetAllPagedWithFilters(skippedItems, request.PageSize, request.Category, currentYear, request.Month);
                var count = await _repository.GetCount(request.Category, currentYear, request.Month);

                var res = new GetAllSpendsView();
                res.Items = foodProducts.Select(p => MapFoodProductToView(p)).ToList();
                res.PageSize = request.PageSize;
                res.Page = request.Page;
                res.Count = count;
                return res;
            }

            private SpendGetAllViewItem MapFoodProductToView(Spend spend)
            {
                var res = new SpendGetAllViewItem();
                res.Id = spend.Id;
                res.CategoryId = spend.CategoryId;
                res.CreationDate = spend.CreationDate;
                res.Month = spend.Month;
                res.Year = spend.Year;
                res.Price = spend.Price;
                res.OrderDay = spend.OrderDay;
                res.Category = new SpendCategoryView
                {
                    CreationDate = spend.Category.CreationDate,
                    Id = spend.Category.Id,
                    Name = spend.Category.Name
                };

                return res;
            }
        }
    }
}
