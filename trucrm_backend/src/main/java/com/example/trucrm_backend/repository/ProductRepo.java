package com.example.trucrm_backend.repository;

import java.util.List;

import com.example.trucrm_backend.model.Product;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends MongoRepository<Product, String> {

    public List<Product> findByUsername(String username);

    public Product findByProductName(String productName);
}
