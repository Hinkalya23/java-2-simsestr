package com.magazin.favorites.controller;

import com.magazin.favorites.model.FavoriteItem;
import com.magazin.favorites.service.FavoritesService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoritesController {
    private final FavoritesService favoritesService;

    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }

    @GetMapping
    public List<FavoriteItem> getFavorites(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName()); // TODO: Реализовать правильное извлечение userId
        return favoritesService.getFavorites(userId);
    }

    @PostMapping("/add")
    public FavoriteItem addToFavorites(@RequestBody FavoriteItem item, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName()); // TODO: Реализовать правильное извлечение userId
        item.setUserId(userId);
        return favoritesService.addToFavorites(item);
    }

    @DeleteMapping("/remove/{itemId}")
    public void removeFromFavoritesById(@PathVariable Long itemId, Authentication authentication) {
        favoritesService.removeFromFavoritesById(itemId);
    }

    @DeleteMapping("/removeByProduct/{productId}")
    public ResponseEntity<?> removeFromFavoritesByUserIdAndProductId(@PathVariable Long productId, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName()); // TODO: Реализовать правильное извлечение userId
        favoritesService.removeFromFavorites(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public void clearFavorites(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName()); // TODO: Реализовать правильное извлечение userId
        favoritesService.clearFavorites(userId);
    }

    @GetMapping("/isFavorite/{productId}")
    public boolean isFavorite(@PathVariable Long productId, Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName()); // TODO: Реализовать правильное извлечение userId
        return favoritesService.isFavorite(userId, productId);
    }
} 