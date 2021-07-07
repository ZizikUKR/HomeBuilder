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
    public class GetAllWasteProducts
    {
        public class Query : PagedRequest, IRequest<GetAllFoodWasteView>
        {
            public string Category { get; set; }
            public int Month { get; set; }
        }

        public class Handler : IRequestHandler<Query, GetAllFoodWasteView>
        {
            private readonly IFoodWasteRepository _repository;

            public Handler(IFoodWasteRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetAllFoodWasteView> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentYear = DateTime.UtcNow.Year;
                int skippedItems = PaginationHelper.CalculateSkiptedItems(request.Page, request.PageSize);

                var foodProducts =
                    await _repository.GetAllPagedWithFilters(skippedItems, request.PageSize, request.Category, currentYear, request.Month);
                var count = await _repository.GetCount(request.Category, currentYear, request.Month);

                var res = new GetAllFoodWasteView();
                res.Items = foodProducts.Select(p => MapWasteProductToView(p)).ToList();
                res.PageSize = request.PageSize;
                res.Page = request.Page;
                res.Count = count;
                return res;
            }

            private FoodWasteGetAllViewItem MapWasteProductToView(FoodWaste product)
            {
                var res = new FoodWasteGetAllViewItem();
                res.Id = product.Id;
                res.CategoryId = product.CategoryId;
                res.Month = product.Month;
                res.Year = product.Year;
                res.Price = product.Price;
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
