package com.nft.ncity.domain.favorite.service;

import com.nft.ncity.domain.favorite.db.entity.Favorite;
import com.nft.ncity.domain.favorite.db.repository.FavoriteRepositorySupport;
import com.nft.ncity.domain.product.db.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("favoriteService")
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    FavoriteRepositorySupport favoriteRepositorySupport;


    @Override
    public Favorite favoriteRegister(Long userId, Long productId) {
        Favorite favorite = favoriteRepositorySupport.favoriteRegister(userId,productId);
        return favorite;
    }

    @Override
    public Favorite favoriteRemove(Long userId, Long productId) {
        Favorite favorite = favoriteRepositorySupport.favoriteRemove(userId,productId);
        return favorite;
    }

    @Override
    public int getFavoriteCount(Long productId) {
        return 0;
    }

    @Override
    public List<Product> favoriteList(Long userId) {
        return null;
    }
}
