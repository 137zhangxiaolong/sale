package com.ambow.springboot.demo.mapper;

import com.ambow.springboot.demo.model.Sale;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SaleMapper {

    public Integer AddSale(@Param("mysale") Sale sale);

    public List<Sale> findAllSale(@Param("saledate") String saledate,@Param("totalprice") String totalprice);


}
