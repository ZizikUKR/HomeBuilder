using FluentValidation;
using Homebuilder.Domain.Views.Longs.Todos;

namespace Homebuilder.Domain.Validators.Longs.ToDos
{
    public class CreateToDoValidator : AbstractValidator<CreateToDoView>
    {
        public CreateToDoValidator()
        {
            RuleFor(p => p.Information).NotEmpty().WithMessage("The Information can't be empty").MaximumLength(300).WithMessage("Information cannot be more than 300 charachters");
            RuleFor(p => p.Description).NotEmpty().WithMessage("The Description can't be empty").MaximumLength(200).WithMessage("Description cannot be more than 200 charachters");
            RuleFor(p => p.ToDo).NotEmpty().WithMessage("The ToDo can't be empty").MaximumLength(150).WithMessage("Description cannot be more than 150 charachters"); ;
        }
    }
}
