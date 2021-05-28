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

namespace Homebuilder.Domain.Queries.Guids.Foods
{
    public class GetAllFoodProducts
    {
        public class Query : PagedRequest, IRequest<GetAllFoodProductsView>
        {
            public string Category { get; set; }
            public int Month { get; set; }
        }

        public class Handler : IRequestHandler<Query, GetAllFoodProductsView>
        {
            private readonly IFoodProductRepository _repository;

            public Handler(IFoodProductRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetAllFoodProductsView> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentYear = DateTime.UtcNow.Year;
                int skippedItems = PaginationHelper.CalculateSkiptedItems(request.Page, request.PageSize);

                var foodProducts =
                    await _repository.GetAllPagedWithFilters(skippedItems, request.PageSize, request.Category, currentYear, request.Month);
                var count = await _repository.GetCount(request.Category, currentYear, request.Month);

                var res = new GetAllFoodProductsView();
                res.Items = foodProducts.Select(p => MapFoodProductToView(p)).ToList();
                res.PageSize = request.PageSize;
                res.Page = request.Page;
                res.Count = count;
                return res;
            }

            private FoodProductGetAllViewItem MapFoodProductToView(FoodProduct product)
            {
                var res = new FoodProductGetAllViewItem();
                res.Id = product.Id;
                res.CategoryId = product.CategoryId;
                res.CreationDate = product.CreationDate;
                res.Month = product.Month;
                res.Year = product.Year;
                res.Price = product.Price;
                res.OrderDay = product.OrderDay;
                res.Category = new FoodCategoryView
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
