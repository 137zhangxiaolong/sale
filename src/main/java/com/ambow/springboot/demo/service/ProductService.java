package com.ambow.springboot.demo.service;

import com.ambow.springboot.demo.model.Product;

import java.util.List;

public interface ProductService {

    public List<Product> findAll();

    public Product findById(Integer id);

    public Integer updateProduct(Product product);
}
