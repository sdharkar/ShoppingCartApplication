package com.example.trucrm_backend.repository;

import java.util.List;

import com.example.trucrm_backend.model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends MongoRepository<Order, Long> {

    public List<Order> findByUsername(String username);

    public Order findByOrderId(long orderId);
}
