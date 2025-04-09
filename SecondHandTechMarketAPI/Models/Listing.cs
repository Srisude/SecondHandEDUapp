using System;
using System.Collections.Generic;

namespace SecondHandTechMarketAPI.Models;

public partial class Listing
{
    public int ListingId { get; set; }

    public int? ProductId { get; set; }

    public string? ListingStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int? SellerId { get; set; }

    public DateTime? ListingDate { get; set; }

    public virtual Product? Product { get; set; }

    public virtual User? Seller { get; set; }
}
