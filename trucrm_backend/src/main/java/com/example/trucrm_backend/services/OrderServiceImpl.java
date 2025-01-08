package com.example.trucrm_backend.services;

import java.util.List;

import com.example.trucrm_backend.model.Order;
import com.example.trucrm_backend.model.Product;
import com.example.trucrm_backend.repository.OrderRepo;
import com.example.trucrm_backend.repository.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ProductRepo productRepo;

    @Override
    public List<Order> getAllOrder() {

        return this.orderRepo.findAll();
    }

    @Override
    public List<Order> getOrderByUsername(String username) {

        return this.orderRepo.findByUsername(username);
    }

    @Override
    public Order getOrderByOrderId(long orderId) {

        return this.orderRepo.findByOrderId(orderId);
    }

    @Override
    public String setOrder(Order order) {

        List<Product> products = order.getProduct();

        for (Product p : products) {
            Product product = productRepo.findByProductName(p.getProductName());
            product.setProductQuantity(product.getProductQuantity() - p.getProductQuantity());
            productRepo.save(product);
        }

        this.orderRepo.save(order);
        return "Order Details Added Successfully!";
    }

    @Override
    public String updateOrder(Order order) {

        System.out.println(order);

        this.orderRepo.save(order);
        return "Order Details Updated Successfully!";
    }

    @Override
    public String deleteOrder(long orderId) {

        this.orderRepo.deleteById(orderId);
        return "Order Details Deleted Successfully!";
    }

}
