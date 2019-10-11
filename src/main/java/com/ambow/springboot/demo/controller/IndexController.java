package com.ambow.springboot.demo.controller;

import com.ambow.springboot.demo.common.web.BaseController;
import com.ambow.springboot.demo.model.Product;
import com.ambow.springboot.demo.model.Sale;
import com.ambow.springboot.demo.model.User;
import com.ambow.springboot.demo.service.ProductService;
import com.ambow.springboot.demo.service.SaleService;
import com.ambow.springboot.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class IndexController extends BaseController {

    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;
    @Autowired
    private SaleService saleService;

    //用户登录
    @PostMapping("/userLogin")
    public String userLogin(User user, HttpSession session){
        User loginUser = userService.login(user.getUserName(), user.getPwd());
        session.setAttribute("loginUser",loginUser);
        return dealQueryResult(loginUser,loginUser);
    }
    //展示所有销售
    @PostMapping("/myzxlsale")
    public String myzxlSale(){
        List<Product> allProduct = productService.findAll();
        return dealQueryResult(allProduct,allProduct);
    }
    //销售
    @PostMapping("/relmyzxlsale")
    public String relmyzxlSale(Sale sale,HttpSession session,Integer productid){

        Product byId = productService.findById(productid);
        if(byId==null || byId.getQuantity() < sale.getQuantity()){
            return "添加失败";
        }else{
            sale.setTotalprice(sale.getPrice()*sale.getQuantity());
            SimpleDateFormat ze = new SimpleDateFormat("yyyy-MM-dd");
            String boenddate = ze.format(new Date());
            sale.setSaledate(boenddate);
            User loginUser = (User)session.getAttribute("loginUser");
            sale.setUser(loginUser);
            sale.setProduct(byId);
            byId.setQuantity(byId.getQuantity()-sale.getQuantity());
            productService.updateProduct(byId);
            saleService.addSale(sale);
            return "添加成功";
        }
    }

    //展示所有销售信息
    @PostMapping("/myzxlshowsale")
    public String myzxlshowsale(String flag){
        List<Sale> allSale = null;
        if(flag!=null && flag.equals("1")){
            allSale= saleService.findAllSale(null,"totalprice");
        }else{
            allSale = saleService.findAllSale("saledate",null);
        }
        return dealQueryResult(allSale,allSale);
    }
    //查询库存
    @PostMapping("/selectProductNum")
    public String selectProductNum(Integer id){
        Product byId = productService.findById(id);
        return dealQueryResult(byId,byId);

    }
    //用户退出
   /* public String userExit(){

    }*/


}
