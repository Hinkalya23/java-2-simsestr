package com.magazin.cart.controller;

import com.magazin.cart.model.CartItem;
import com.magazin.cart.service.CartService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public List<CartItem> getCart(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return cartService.getCart(userId);
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartItem item, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        item.setUserId(userId);
        return cartService.addToCart(item);
    }

    @DeleteMapping("/remove/{itemId}")
    public void removeFromCart(@PathVariable Long itemId, Authentication authentication) {
        cartService.removeFromCart(itemId);
    }

    @DeleteMapping("/clear")
    public void clearCart(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        cartService.clearCart(userId);
    }
} 