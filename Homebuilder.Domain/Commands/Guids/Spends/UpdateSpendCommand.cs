using Homebuilder.Domain.Entities.Guids.Spends;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Homebuilder.Domain.Views.Guids.Foods;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Guids.Spends
{
    public class UpdateSpendCommand
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public int Year { get; set; }
            public decimal Price { get; set; }
            public int Month { get; set; }
            public DateTime OrderDay { get; set; }
            public FoodCategoryView Category { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly ISpendRepository _repository;
            private readonly ISpendCategoryRepository _categoryRepository;

            public Handler(ISpendRepository repository, ISpendCategoryRepository categoryRepository)
            {
                _repository = repository;
                _categoryRepository = categoryRepository;
            }

            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var foodProduct = await _repository.Get(request.Id);

                if (foodProduct is null)
                {
                    throw new Exception("Food product doesn't exist!");
                }

                SpendCategory category = await _categoryRepository.GetByName(request?.Category?.Name);
                if (category is null)
                {
                    category = new SpendCategory { Name = request?.Category?.Name };

                    await _categoryRepository.Add(category);
                }

                MapWasteProductViewToModel(foodProduct, request, category.Id);
                await _repository.Update(foodProduct);
            }

            private void MapWasteProductViewToModel(Spend spend, Command request, string categoryId)
            {
                spend.Price = request.Price;
                spend.Month = request.Month;
                spend.Year = request.Year;
                spend.OrderDay = request.OrderDay;
                spend.CategoryId = categoryId;
            }
        }
    }
}
