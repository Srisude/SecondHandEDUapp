using System;
using System.Collections.Generic;

namespace SecondHandTechMarketAPI.Models;

public partial class Offer
{
    public int OfferId { get; set; }

    public int? BuyerId { get; set; }

    public int? ProductId { get; set; }

    public decimal OfferPrice { get; set; }

    public string? OfferStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? Buyer { get; set; }

    public virtual Product? Product { get; set; }
}
