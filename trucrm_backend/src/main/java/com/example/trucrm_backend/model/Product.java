package com.example.trucrm_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {

    @Id
    private String productName;
    private String image;
    private String productCategory;
    private int productQuantity;
    private int productPrice;
    private boolean inKG;
    private String username;

    public Product() {
    }

    public Product(String productName, String image, String productCategory, int productQuantity, int productPrice,
            boolean inKG, String username) {
        this.productName = productName;
        this.image = image;
        this.productCategory = productCategory;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.inKG = inKG;
        this.username = username;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public int getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(int productPrice) {
        this.productPrice = productPrice;
    }

    public boolean isInKG() {
        return inKG;
    }

    public void setInKG(boolean inKG) {
        this.inKG = inKG;
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
        result = prime * result + ((image == null) ? 0 : image.hashCode());
        result = prime * result + (inKG ? 1231 : 1237);
        result = prime * result + ((productCategory == null) ? 0 : productCategory.hashCode());
        result = prime * result + ((productName == null) ? 0 : productName.hashCode());
        result = prime * result + productPrice;
        result = prime * result + productQuantity;
        result = prime * result + ((username == null) ? 0 : username.hashCode());
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
        Product other = (Product) obj;
        if (image == null) {
            if (other.image != null)
                return false;
        } else if (!image.equals(other.image))
            return false;
        if (inKG != other.inKG)
            return false;
        if (productCategory == null) {
            if (other.productCategory != null)
                return false;
        } else if (!productCategory.equals(other.productCategory))
            return false;
        if (productName == null) {
            if (other.productName != null)
                return false;
        } else if (!productName.equals(other.productName))
            return false;
        if (productPrice != other.productPrice)
            return false;
        if (productQuantity != other.productQuantity)
            return false;
        if (username == null) {
            if (other.username != null)
                return false;
        } else if (!username.equals(other.username))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Product [image=" + image + ", inKG=" + inKG + ", productCategory=" + productCategory + ", productName="
                + productName + ", productPrice=" + productPrice + ", productQuantity=" + productQuantity
                + ", username=" + username + "]";
    }

}
