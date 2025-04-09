using System;
using System.Collections.Generic;

namespace SecondHandTechMarketAPI.Models;

public partial class Message
{
    public int MessageId { get; set; }

    public int? SenderId { get; set; }

    public int? ReceiverId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime? SentAt { get; set; }

    public virtual User? Receiver { get; set; }

    public virtual User? Sender { get; set; }
}
