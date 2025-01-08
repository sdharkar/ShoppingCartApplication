package com.example.trucrm_backend.repository;

import java.util.List;

import com.example.trucrm_backend.model.Customer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepo extends MongoRepository<Customer, Long> {

    public List<Customer> findByName(String name);

    public Customer findById(long id);

    public List<Customer> findByUsername(String username);
}
