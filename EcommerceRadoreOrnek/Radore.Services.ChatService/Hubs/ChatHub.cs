using Microsoft.AspNetCore.SignalR;
using Radore.Services.ChatService.DbContexts;
using Radore.Services.ChatService.Models;

namespace SignalRWebApi.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatServiceDbContext _context;

        public ChatHub(ChatServiceDbContext context) => _context = context;

        public async Task JoinChat(UserConnection conn)
        {
            await Clients.All.SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined the chat room {conn.ChatRoom}");
        }

        public async Task JoinSpecificChatRoom(UserConnection conn)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);

            conn.ConnectionId = Context.ConnectionId;
            _context.Connections.Add(conn);
            await _context.SaveChangesAsync();

            await Clients.Group(conn.ChatRoom).SendAsync("JoinSpecificChatRoom", "admin", $"{conn.Username} has joined the chat room {conn.ChatRoom}");
        }

        public async Task SendMessage(string msg)
        {
            var conn = await _context.Connections.FindAsync(Context.ConnectionId);
            if (conn != null)
            {
                await Clients.Group(conn.ChatRoom).SendAsync("ReceiveSpecificMessage", conn.Username, msg);
            }
        }
    }
}
