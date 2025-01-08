package com.example.trucrm_backend.services;

import java.util.List;

import com.example.trucrm_backend.model.Product;

public interface ProductService {

    public List<Product> getAllProducts();

    public List<Product> getAllProductByUsername(String username);

    public Product getProductByProductName(String productName);

    public String setProduct(Product product);

    public String updateProduct(Product product);

    public String deleteProduct(String productName);
}
