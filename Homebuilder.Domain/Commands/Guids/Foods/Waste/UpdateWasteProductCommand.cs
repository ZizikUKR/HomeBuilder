using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Homebuilder.Domain.Views.Guids.Foods;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Guids.Foods
{
    public class UpdateWasteProductCommand
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public int Year { get; set; }
            public decimal Price { get; set; }
            public int Month { get; set; }
            public FoodCategoryView Category { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IFoodWasteRepository _repository;
            private readonly IFoodCategoryRepository _categoryRepository;

            public Handler(IFoodWasteRepository repository, IFoodCategoryRepository categoryRepository)
            {
                _repository = repository;
                _categoryRepository = categoryRepository;
            }

            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var foodProduct = await _repository.Get(request.Id);

                if (foodProduct is null)
                {
                    throw new Exception("Waste product doesn't exist!");
                }

                FoodCategory category = await _categoryRepository.GetByName(request?.Category?.Name);
                if (category is null)
                {
                    category = new FoodCategory { Name = request?.Category?.Name };

                    await _categoryRepository.Add(category);
                }

                MapWasteProductViewToModel(foodProduct, request, category.Id);
                await _repository.Update(foodProduct);
            }

            private void MapWasteProductViewToModel(FoodWaste bill, Command request, string categoryId)
            {
                bill.Price = request.Price;
                bill.Month = request.Month;
                bill.Year = request.Year;
                bill.CategoryId = categoryId;
            }
        }
    }
}
