package com.example.trucrm_backend.controller;

import java.util.List;

import com.example.trucrm_backend.model.Product;
import com.example.trucrm_backend.services.ProductServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductServiceImpl productServiceImpl;

    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProduct() {
        try {
            return ResponseEntity.ok().body(this.productServiceImpl.getAllProducts());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/username")
    public ResponseEntity<List<Product>> getProductByUsername(@RequestParam("username") String username) {
        try {
            return ResponseEntity.ok().body(this.productServiceImpl.getAllProductByUsername(username));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/product-name")
    public ResponseEntity<Product> getProductByProductName(@RequestParam("productName") String productName) {
        try {
            return ResponseEntity.ok().body(this.productServiceImpl.getProductByProductName(productName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<String> setProduct(@RequestBody Product product) {
        try {
            return ResponseEntity.ok().body(this.productServiceImpl.setProduct(product));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went Wrong!!");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestParam("productName") String productName,
            @RequestBody Product product) {

        try {

            List<Product> products = this.productServiceImpl.getAllProducts();

            for (Product p : products) {
                if (p.getProductName().equals(productName)) {
                    return ResponseEntity.ok().body(this.productServiceImpl.updateProduct(product));
                }
            }

            throw new Exception();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Details Not Found!");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProduct(@RequestParam("productName") String productName) {
        try {
            List<Product> products = this.productServiceImpl.getAllProducts();

            for (Product p : products) {
                if (p.getProductName().equals(productName)) {
                    return ResponseEntity.ok().body(this.productServiceImpl.deleteProduct(productName));
                }
            }

            throw new Exception();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product Details Not Found!");
        }
    }
}
