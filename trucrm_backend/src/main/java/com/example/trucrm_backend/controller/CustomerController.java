package com.example.trucrm_backend.controller;

import java.util.List;

import com.example.trucrm_backend.model.Customer;
import com.example.trucrm_backend.services.CustomerServiceImpl;
import com.example.trucrm_backend.services.SequenceGeneratorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    @Autowired
    private CustomerServiceImpl customerServiceImpl;

    @Autowired
    private SequenceGeneratorService service;

    @GetMapping("/")
    public ResponseEntity<List<Customer>> getAllCustomers() {

        try {
            return ResponseEntity.ok().body(this.customerServiceImpl.getAllCustomers());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable long id) {
        try {
            return ResponseEntity.ok().body(this.customerServiceImpl.getCustomerById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/name")
    public ResponseEntity<List<Customer>> getCustomerByName(@RequestParam("name") String name) {
        try {
            return ResponseEntity.ok().body(this.customerServiceImpl.getCustomerByName(name));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/username")
    public ResponseEntity<List<Customer>> getCustomerByUsername(@RequestParam("username") String username) {
        try {
            return ResponseEntity.ok().body(this.customerServiceImpl.getCustomerByUsername(username));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<String> setCustomer(@RequestBody Customer customer) {
        try {
            customer.setId(service.getSequenceNumber(Customer.SEQUENCE_NAME));
            return ResponseEntity.ok().body(this.customerServiceImpl.setCustomer(customer));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCustomer(@RequestBody Customer customer) {
        try {
            List<Customer> customers = this.customerServiceImpl.getAllCustomers();

            for (Customer c : customers) {
                if (c.getId() == customer.getId()) {
                    return ResponseEntity.ok().body(this.customerServiceImpl.updateCustomer(customer));
                }
            }
            throw new Exception();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer Details Not Found!!");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id") long id) {
        try {
            List<Customer> customers = this.customerServiceImpl.getAllCustomers();

            for (Customer c : customers) {
                if (c.getId() == id) {
                    return ResponseEntity.ok().body(this.customerServiceImpl.deleteCustomer(id));
                }
            }
            throw new Exception();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer Details Not Found!!");
        }
    }
}
