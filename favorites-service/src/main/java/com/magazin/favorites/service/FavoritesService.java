package com.magazin.favorites.service;

import com.magazin.favorites.model.FavoriteItem;
import com.magazin.favorites.repository.FavoriteItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritesService {
    private final FavoriteItemRepository favoriteItemRepository;

    public FavoritesService(FavoriteItemRepository favoriteItemRepository) {
        this.favoriteItemRepository = favoriteItemRepository;
    }

    public List<FavoriteItem> getFavorites(Long userId) {
        return favoriteItemRepository.findByUserId(userId);
    }

    public FavoriteItem addToFavorites(FavoriteItem item) {
        // Проверить, добавлен ли уже этот товар в избранное для этого пользователя
        Optional<FavoriteItem> existingItem = favoriteItemRepository.findByUserIdAndProductId(item.getUserId(), item.getProductId());
        if (existingItem.isPresent()) {
            return existingItem.get(); // Уже в избранном
        } else {
            return favoriteItemRepository.save(item);
        }
    }

    public void removeFromFavorites(Long userId, Long productId) {
        Optional<FavoriteItem> item = favoriteItemRepository.findByUserIdAndProductId(userId, productId);
        item.ifPresent(favoriteItemRepository::delete);
    }

     public void removeFromFavoritesById(Long itemId) {
        favoriteItemRepository.deleteById(itemId);
    }

    public void clearFavorites(Long userId) {
        favoriteItemRepository.deleteByUserId(userId);
    }

    public boolean isFavorite(Long userId, Long productId) {
        return favoriteItemRepository.findByUserIdAndProductId(userId, productId).isPresent();
    }
} 