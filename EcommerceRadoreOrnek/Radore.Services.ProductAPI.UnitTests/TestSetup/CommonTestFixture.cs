using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Radore.Services.ProductAPI.DbContexts;
using Radore.Services.ProductAPI.Dto;
using Radore.Services.ProductAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Radore.Services.ProductAPI.UnitTests.TestSetup
{
    public class CommonTestFixture
    {
        public ApplicationDbContext Context { get; private set; }
        public IMapper Mapper { get; set; }

        public CommonTestFixture()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName:"RadoreProductAPITestDb")
                .Options;
            Context = new ApplicationDbContext(options);
            Context.Database.EnsureCreated();
            if (Context.Products.Count() == 0)
            {
            Context.AddProducts();
            Context.SaveChanges();

            }

            Mapper = new MapperConfiguration(cfg =>
            {
               cfg.AddProfile<MappingConfig>();
            }).CreateMapper();
        }
    }
}
