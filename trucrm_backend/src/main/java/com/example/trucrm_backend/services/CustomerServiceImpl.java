package com.example.trucrm_backend.services;

import java.util.List;

import com.example.trucrm_backend.model.Customer;
import com.example.trucrm_backend.repository.CustomerRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Override
    public List<Customer> getAllCustomers() {

        return this.customerRepo.findAll();
    }

    @Override
    public Customer getCustomerById(long id) {

        return this.customerRepo.findById(id);
    }

    @Override
    public List<Customer> getCustomerByName(String name) {

        return this.customerRepo.findByName(name);
    }

    @Override
    public String setCustomer(Customer customer) {

        this.customerRepo.save(customer);

        return "Customer Details Added Successfully!";
    }

    @Override
    public String updateCustomer(Customer customer) {

        this.customerRepo.save(customer);

        return "Customer Details Updated Successfully!";
    }

    @Override
    public String deleteCustomer(long id) {

        this.customerRepo.deleteById(id);

        return "Customer Details Deleted Successfully!";
    }

    @Override
    public List<Customer> getCustomerByUsername(String username) {

        return this.customerRepo.findByUsername(username);
    }

}
