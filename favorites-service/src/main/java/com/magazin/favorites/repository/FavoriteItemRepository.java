package com.magazin.favorites.repository;

import com.magazin.favorites.model.FavoriteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FavoriteItemRepository extends JpaRepository<FavoriteItem, Long> {
    List<FavoriteItem> findByUserId(Long userId);
    Optional<FavoriteItem> findByUserIdAndProductId(Long userId, Long productId);

    @Transactional
    void deleteByUserId(Long userId);
} 