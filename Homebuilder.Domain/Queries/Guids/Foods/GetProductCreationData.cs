using Homebuilder.Domain.Repositories.Guids.Foods;
using Homebuilder.Domain.Views.Guids.Foods;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Homebuilder.Domain.Views;

namespace Homebuilder.Domain.Queries.Guids.Foods
{
    public class GetProductCreationData
    {
        public class Query : IRequest<GetProductCreationDataView> { }

        public class Handler : IRequestHandler<Query, GetProductCreationDataView>
        {
            private readonly IFoodCategoryRepository _repository;

            public Handler(IFoodCategoryRepository repository)
            {
                _repository = repository;
            }
            public async Task<GetProductCreationDataView> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _repository.GetAll();
                var res = new GetProductCreationDataView();
                res.Categories = categories.Select(p => p.Name).ToList();
                //res.Categories = categories.Select(p => new NgSelection
                //{
                //    Label = p.Name,
                //    Value = p.Name
                //});

                return res;
            }
        }
    }
}
