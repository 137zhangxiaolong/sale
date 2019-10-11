package com.ambow.springboot.demo.service.imlp;

import com.ambow.springboot.demo.mapper.ProductMapper;
import com.ambow.springboot.demo.model.Product;
import com.ambow.springboot.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional(rollbackFor = Exception.class)
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<Product> findAll() {
        return productMapper.getAllProduct();
    }

    @Override
    public Product findById(Integer id) {
        return productMapper.getProductById(id);
    }

    @Override
    public Integer updateProduct(Product product) {
        return productMapper.updateProduct(product);
    }
}
