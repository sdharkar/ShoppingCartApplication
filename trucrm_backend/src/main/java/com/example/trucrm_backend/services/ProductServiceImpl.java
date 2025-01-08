package com.example.trucrm_backend.services;

import java.util.List;
import com.example.trucrm_backend.model.Product;
import com.example.trucrm_backend.repository.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Override
    public List<Product> getAllProducts() {

        return this.productRepo.findAll();
    }

    @Override
    public List<Product> getAllProductByUsername(String username) {

        return this.productRepo.findByUsername(username);
    }

    @Override
    public Product getProductByProductName(String productName) {

        return this.productRepo.findByProductName(productName);
    }

    @Override
    public String setProduct(Product product) {

        this.productRepo.save(product);

        return "Product Details Added Successfully!";
    }

    @Override
    public String updateProduct(Product product) {

        this.productRepo.save(product);

        return "Product Details Updated Successfully!";
    }

    @Override
    public String deleteProduct(String productName) {

        this.productRepo.deleteById(productName);

        return "Product Details Deleted Successfully!";
    }

}
