package com.ambow.springboot.demo.service.imlp;

import com.ambow.springboot.demo.mapper.SaleMapper;
import com.ambow.springboot.demo.model.Sale;
import com.ambow.springboot.demo.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class SaleServiceImpl implements SaleService {
    @Autowired
    private SaleMapper saleMapper;

    @Override
    public Integer addSale(Sale sale) {
        return saleMapper.AddSale(sale);
    }

    @Override
    public List<Sale> findAllSale(String saledate,String totalprice) {
        return saleMapper.findAllSale(saledate,totalprice);
    }
}
