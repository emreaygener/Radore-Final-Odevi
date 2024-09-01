using System.ComponentModel.DataAnnotations;

namespace Radore.Services.ChatService.Models
{
    public class UserConnection
    {
        [Key]
        [Required]
        public string ConnectionId { get; set; }
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string ChatRoom { get; set; } = string.Empty;
    }
}
