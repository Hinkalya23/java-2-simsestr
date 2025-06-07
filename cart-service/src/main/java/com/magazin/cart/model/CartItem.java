package com.magazin.cart.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // или String username/email, если userId нет

    private Long productId;
    private String productName;
    private String productImage;
    private Double price;
    private Integer quantity;
} 