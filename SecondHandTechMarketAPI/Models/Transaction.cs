using System;
using System.Collections.Generic;

namespace SecondHandTechMarketAPI.Models;

public partial class Transaction
{
    public int TransactionId { get; set; }

    public int? BuyerId { get; set; }

    public int? SellerId { get; set; }

    public int? ProductId { get; set; }

    public decimal Price { get; set; }

    public DateTime? TransactionDate { get; set; }

    public string? PaymentStatus { get; set; }

    public virtual User? Buyer { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User? Seller { get; set; }
}
