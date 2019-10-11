package com.ambow.springboot.demo.service;

import com.ambow.springboot.demo.model.Sale;

import java.util.List;

public interface SaleService {

    public Integer addSale(Sale sale);

    public List<Sale> findAllSale(String saledate,String totalprice);
}
