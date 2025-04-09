using System;
using System.Collections.Generic;

namespace SecondHandTechMarketAPI.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public int? SellerId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public string? Condition { get; set; }


    public decimal Price { get; set; }

    public string? Category { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Listing> Listings { get; set; } = new List<Listing>();

    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    public virtual User? Seller { get; set; }

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
