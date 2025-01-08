package com.example.trucrm_backend.services;

import java.util.List;

import com.example.trucrm_backend.model.Customer;

public interface CustomerService {

    public List<Customer> getAllCustomers();

    public Customer getCustomerById(long id);

    public List<Customer> getCustomerByName(String name);

    public List<Customer> getCustomerByUsername(String username);

    public String setCustomer(Customer customer);

    public String updateCustomer(Customer customer);

    public String deleteCustomer(long id);
}
