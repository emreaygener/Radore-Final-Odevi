using Microsoft.EntityFrameworkCore;
using Radore.Services.ChatService.Models;

namespace Radore.Services.ChatService.DbContexts
{
    public class ChatServiceDbContext : DbContext
    {
        public ChatServiceDbContext(DbContextOptions<ChatServiceDbContext> options) : base(options)
        {
        }

        public DbSet<UserConnection> Connections { get; set; }
    }
}
