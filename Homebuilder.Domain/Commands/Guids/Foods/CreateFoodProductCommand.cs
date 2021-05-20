using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using Homebuilder.Domain.Views.Guids.Foods;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Homebuilder.Domain.Commands.Guids.Foods
{
    public class CreateUtilityBillCommand
    {
        public class Command : IRequest
        {
            public int Year { get; set; }
            public decimal Price { get; set; }
            public int Month { get; set; }
            public DateTime OrderDay { get; set; }
            public string Category { get; set; }
        }

        public class Handler : AsyncRequestHandler<Command>
        {
            private readonly IFoodProductRepository _repository;
            private readonly IFoodCategoryRepository _categoryRepository;

            public Handler(IFoodProductRepository repository, IFoodCategoryRepository categoryRepository)
            {
                _repository = repository;
                _categoryRepository = categoryRepository;
            }
            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                FoodCategory category = await _categoryRepository.GetByName(request?.Category);
                if (category is null)
                {
                    category = new FoodCategory();
                    category.Name = request?.Category;

                    await _categoryRepository.Add(category);
                }
                await _repository.Add(MapUtilityBillViewToModel(request, category.Id));
            }

            private FoodProduct MapUtilityBillViewToModel(Command command, Guid categoryId)
            {
                var res = new FoodProduct();
                res.Month = command.Month;
                res.Price = command.Price;
                res.Year = command.Year;
                res.OrderDay = command.OrderDay;
                res.CategoryId = categoryId;
                return res;
            }
        }
    }
}
