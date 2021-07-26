using System;
using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Homebuilder.Domain.Views;
using Homebuilder.Domain.Views.Guids.Foods;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Homebuilder.Domain.Helpers;

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
            private readonly IFoodProductRepository _repository;

            public Handler(IFoodProductRepository repository)
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

            private SpendGetAllViewItem MapFoodProductToView(FoodProduct product)
            {
                var res = new SpendGetAllViewItem();
                res.Id = product.Id;
                res.CategoryId = product.CategoryId;
                res.CreationDate = product.CreationDate;
                res.Month = product.Month;
                res.Year = product.Year;
                res.Price = product.Price;
                res.OrderDay = product.OrderDay;
                res.Category = new SpendCategoryView
                {
                    CreationDate = product.Category.CreationDate,
                    Id = product.Category.Id,
                    Name = product.Category.Name
                };

                return res;
            }
        }
    }
}
