package com.ambow.springboot.demo.mapper;

import com.ambow.springboot.demo.model.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductMapper {

    public List<Product> getAllProduct();

    public Product getProductById(@Param("id") Integer id);

    public Integer updateProduct(@Param("product") Product product);
}
