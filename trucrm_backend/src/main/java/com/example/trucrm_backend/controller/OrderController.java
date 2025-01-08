package com.example.trucrm_backend.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import com.example.trucrm_backend.model.Order;
import com.example.trucrm_backend.services.OrderServiceImpl;

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
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderServiceImpl;

    public static int getRandomNumber() {
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        return number;
    }

    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrder() {
        try {
            return ResponseEntity.ok().body(this.orderServiceImpl.getAllOrder());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/username")
    public ResponseEntity<List<Order>> getOrderByUsername(@RequestParam String username) {
        try {
            return ResponseEntity.ok().body(this.orderServiceImpl.getOrderByUsername(username));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/orderId")
    public ResponseEntity<Order> getOrderByOrderId(@RequestParam long orderId) {
        try {
            return ResponseEntity.ok().body(this.orderServiceImpl.getOrderByOrderId(orderId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<String> setOrder(@RequestBody Order order) {
        try {

            order.setOrderId(getRandomNumber());
            LocalDate today = LocalDate.now();
            order.setOrderDate(today);
            this.orderServiceImpl.setOrder(order);
            return ResponseEntity.ok().body(String.valueOf(order.getOrderId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something Went Wrong!!");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOrder(@RequestBody Order order) {
        try {
            if (order.getOrderId() != 0) {

                List<Order> orders = this.orderServiceImpl.getAllOrder();

                for (Order o : orders) {
                    if (o.getOrderId() == order.getOrderId()) {
                        return ResponseEntity.ok().body(this.orderServiceImpl.updateOrder(order));
                    }
                }
                throw new Exception();
            } else {
                throw new Exception();
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order Id doesn't exists!");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteOrder(@RequestParam long orderId) {
        try {
            if (orderId != 0) {

                List<Order> orders = this.orderServiceImpl.getAllOrder();

                for (Order o : orders) {
                    if (o.getOrderId() == orderId) {
                        return ResponseEntity.ok().body(this.orderServiceImpl.deleteOrder(orderId));
                    }
                }
                throw new Exception();
            } else {
                throw new Exception();
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order Id doesn't exists!");
        }
    }

}
