package com.example.trucrm_backend.services;

import java.util.List;

import com.example.trucrm_backend.model.Order;

public interface OrderService {

    public List<Order> getAllOrder();

    public List<Order> getOrderByUsername(String username);

    public Order getOrderByOrderId(long orderId);

    public String setOrder(Order order);

    public String updateOrder(Order order);

    public String deleteOrder(long orderId);
}
