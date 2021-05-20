using FluentValidation;
using Homebuilder.Domain.Views.Longs.Activities;

namespace Homebuilder.Domain.Validators.Longs.Activities
{
    public class CreateActivityValidator: AbstractValidator<CreateActivity>
    {
        public CreateActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty().WithMessage("Title can't be empty").MaximumLength(250).WithMessage("Title can't be more than 250 charachters");

            RuleFor(x => x.Code).NotEmpty().WithMessage("Code can't be empty").Length(5);

            RuleFor(x => x.ScheduledDate).NotEmpty().When(z => string.IsNullOrEmpty(z.Code)).WithMessage("ScheduledDate can't be empty");
        }
    }
}
