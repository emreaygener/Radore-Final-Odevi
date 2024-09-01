using AutoMapper;
using FluentAssertions;
using Radore.Services.ProductAPI.DbContexts;
using Radore.Services.ProductAPI.Dto;
using Radore.Services.ProductAPI.Repository;
using Radore.Services.ProductAPI.UnitTests.TestSetup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Radore.Services.ProductAPI.UnitTests.Repository
{
    public class ProductRepositoryTests : IClassFixture<CommonTestFixture>
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ProductRepositoryTests(CommonTestFixture fixture)
        {
            _context = fixture.Context;
            _mapper = fixture.Mapper;
        }

        [Fact]
        public async Task WhenExecuted_Products_ShouldBeReturned()
        {
            ProductRepository productRepository = new ProductRepository(_context, _mapper);
            Func<Task<IEnumerable<ProductDto>>> invoke = FluentActions.Invoking(async() => await productRepository.GetProducts());
            await invoke.Should().NotThrowAsync<Exception>();
            var products = await invoke();
            products.Should().NotBeNull();
            products.Should().BeOfType<List<ProductDto>>();
        }

        [Fact]
        public async Task WhenExecuted_ProductById_ShouldBeReturned()
        {
            ProductRepository productRepository = new ProductRepository(_context, _mapper);
            Func<Task<ProductDto>> invoke = FluentActions.Invoking(async () => await productRepository.GetProductById(1));
            await invoke.Should().NotThrowAsync<Exception>();
            var product = await invoke();
            product.Should().NotBeNull();
            product.Should().BeOfType<ProductDto>();
            product.ProductId.Should().Be(1);
        }

        [Fact]
        public async Task WhenExecuted_CreateProduct_ShouldBeReturned()
        {
            ProductRepository productRepository = new ProductRepository(_context, _mapper);
            ProductDto productDto = new ProductDto()
            {
                Name = "Product3",
                Price = 300,
                CategoryName = "Category3",
                Description = "Description3",
                ImageUrl = "Image3"
            };
            Func<Task<ProductDto>> invoke = FluentActions.Invoking(async () => await productRepository.CreateUpdateProduct(productDto));
            await invoke.Should().NotThrowAsync<Exception>();

            var product = await invoke();
            product.Should().NotBeNull();
            product.Should().BeOfType<ProductDto>();
            product.Name.Should().Be(productDto.Name);
            product.Price.Should().Be(productDto.Price);
            product.CategoryName.Should().Be(productDto.CategoryName);
            product.Description.Should().Be(productDto.Description);
            product.ImageUrl.Should().Be(productDto.ImageUrl);
        }

        [Fact]
        public async Task WhenExecuted_DeleteProduct_ShouldBeReturned()
        {
            ProductRepository productRepository = new ProductRepository(_context, _mapper);
            var productToBeDeleted = _context.Products.FirstOrDefault();
            if (productToBeDeleted == null)
            {
                productToBeDeleted = new Models.Product()
                {
                    Name = "Product4",
                    Price = 400,
                    CategoryName = "Category4",
                    Description = "Description4",
                    ImageUrl = "Image4"
                };
                _context.Products.Add(productToBeDeleted);
                _context.SaveChanges();
            }
            Func<Task<bool>> invoke = FluentActions.Invoking(async () => await productRepository.DeleteProduct(productToBeDeleted.ProductId));
            await invoke.Should().NotThrowAsync<Exception>();

            var checkProduct = await _context.Products.FindAsync(productToBeDeleted.ProductId);
            checkProduct.Should().BeNull();
        }
    }
}
