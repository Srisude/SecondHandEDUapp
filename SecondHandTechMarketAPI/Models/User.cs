using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace SecondHandTechMarketAPI.Models;

public partial class User
{
    public int UserId { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string? Role { get; set; }
    public DateTime? CreatedAt { get; set; }

    [JsonIgnore] // Döngü ve büyük veri yığını olmaması için 
    public virtual ICollection<Listing> Listings { get; set; } = new List<Listing>();

    [JsonIgnore] 
    public virtual ICollection<Message> MessageReceivers { get; set; } = new List<Message>();

    [JsonIgnore] 
    public virtual ICollection<Message> MessageSenders { get; set; } = new List<Message>();

    [JsonIgnore]
    public virtual ICollection<Offer> Offers { get; set; } = new List<Offer>();

    [JsonIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    [JsonIgnore]
    public virtual ICollection<Transaction> TransactionBuyers { get; set; } = new List<Transaction>();

    [JsonIgnore]
    public virtual ICollection<Transaction> TransactionSellers { get; set; } = new List<Transaction>();
}
