using Radore.Services.ProductAPI.DbContexts;
using Radore.Services.ProductAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Radore.Services.ProductAPI.UnitTests.TestSetup
{
    public static class Products
    {
        public static void AddProducts(this ApplicationDbContext context)
        {
            context.AddRange(
                new Product{
                    ProductId = 1,
                    Name = "Product 1",
                    Price = 100,
                    Description = "Description 1",
                    CategoryName = "Category 1",
                    ImageUrl = "https://www.example.com/image1.jpg"
                },
                new Product
                {
                    ProductId = 2,
                    Name = "Product 2",
                    Price = 200,
                    Description = "Description 2",
                    CategoryName = "Category 2",
                    ImageUrl = "https://www.example.com/image2.jpg"
                },
                new Product
                {
                    ProductId = 3,
                    Name = "Product 3",
                    Price = 300,
                    Description = "Description 3",
                    CategoryName = "Category 3",
                    ImageUrl = "https://www.example.com/image3.jpg"
                }
            );
        }
    }
}
