using Homebuilder.Domain.Entities.Guids.Foods;
using Homebuilder.Domain.Repositories.Guids.Foods;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;
using Homebuilder.Domain.Entities.Guids.Spends;

namespace Homebuilder.Domain.Commands.Guids.Spends
{
    public class CreateSpendCommand
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
            private readonly ISpendRepository _repository;
            private readonly ISpendCategoryRepository _categoryRepository;

            public Handler(ISpendRepository repository, ISpendCategoryRepository categoryRepository)
            {
                _repository = repository;
                _categoryRepository = categoryRepository;
            }
            protected override async Task Handle(Command request, CancellationToken cancellationToken)
            {
                SpendCategory category = await _categoryRepository.GetByName(request?.Category);
                if (category is null)
                {
                    category = new SpendCategory();
                    category.Name = request?.Category;

                    await _categoryRepository.Add(category);
                }
                await _repository.Add(MapWasteProductViewToModel(request, category.Id));
            }

            private Spend MapWasteProductViewToModel(Command command, string categoryId)
            {
                var res = new Spend();
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
