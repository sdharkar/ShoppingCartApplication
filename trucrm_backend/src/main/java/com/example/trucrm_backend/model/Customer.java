package com.example.trucrm_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "customers")
public class Customer {

    @Transient
    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    private long id;
    private String image;
    private String name;
    private long mobile;
    private String emailId;
    private String address;
    private boolean verified;
    private String username;

    public Customer() {
    }

    public Customer(long id, String image, String name, long mobile, String emailId, String address, boolean verified,
            String username) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.mobile = mobile;
        this.emailId = emailId;
        this.address = address;
        this.verified = verified;
        this.username = username;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getMobile() {
        return mobile;
    }

    public void setMobile(long mobile) {
        this.mobile = mobile;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((address == null) ? 0 : address.hashCode());
        result = prime * result + ((emailId == null) ? 0 : emailId.hashCode());
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((image == null) ? 0 : image.hashCode());
        result = prime * result + (int) (mobile ^ (mobile >>> 32));
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + ((username == null) ? 0 : username.hashCode());
        result = prime * result + (verified ? 1231 : 1237);
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Customer other = (Customer) obj;
        if (address == null) {
            if (other.address != null)
                return false;
        } else if (!address.equals(other.address))
            return false;
        if (emailId == null) {
            if (other.emailId != null)
                return false;
        } else if (!emailId.equals(other.emailId))
            return false;
        if (id != other.id)
            return false;
        if (image == null) {
            if (other.image != null)
                return false;
        } else if (!image.equals(other.image))
            return false;
        if (mobile != other.mobile)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (username == null) {
            if (other.username != null)
                return false;
        } else if (!username.equals(other.username))
            return false;
        if (verified != other.verified)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Customer [address=" + address + ", emailId=" + emailId + ", id=" + id + ", image=" + image + ", mobile="
                + mobile + ", name=" + name + ", username=" + username + ", verified=" + verified + "]";
    }

}
