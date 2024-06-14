using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<Result<PagedList<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
                
            }
            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  _context.Activities
                .Where(d => d.Date >= request.Params.StartDate)
                .OrderBy(d => d.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, 
                                        new {currentUsername = _userAccessor.GetUserName()}) 
                .AsQueryable();

                if(request.Params.IsGoing && !request.Params.IsHost) 
                {
                    query = query.Where(x => x.Attendees.Any(a => a.Username == _userAccessor.GetUserName()));
                }

                if(request.Params.IsHost && !request.Params.IsGoing) 
                {
                    query = query.Where(x => x.HostUsername== _userAccessor.GetUserName());
                }

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.createAsync(query, request.Params.PageNumber,request.Params.PageSize)
                );
            }
        }
    }
}