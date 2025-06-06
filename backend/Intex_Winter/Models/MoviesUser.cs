﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Intex_Winter.Models;

[Keyless]
[Table("movies_users")]
public partial class MoviesUser
{
    [Column("user_id")]
    public int? UserId { get; set; }

    [Column("name")]
    public string? Name { get; set; }

    [Column("phone")]
    public string? Phone { get; set; }

    [Required]
    [EmailAddress]
    [Column("email")]
    public string? Email { get; set; }

    [Column("age")]
    public int? Age { get; set; }

    [Column("gender")]
    public string? Gender { get; set; }

    public int? Netflix { get; set; }

    [Column("amazon_prime")]
    public int? AmazonPrime { get; set; }

    [Column("disney_")]
    public int? Disney { get; set; }

    [Column("paramount_")]
    public int? Paramount { get; set; }

    [Column("max")]
    public int? Max { get; set; }

    [Column("hulu")]
    public int? Hulu { get; set; }

    [Column("apple_tv_")]
    public int? AppleTv { get; set; }

    public int? Peacock { get; set; }

    [Column("city")]
    public string? City { get; set; }

    [Column("state")]
    public string? State { get; set; }

    [Column("zip")]
    public int? Zip { get; set; }
}
