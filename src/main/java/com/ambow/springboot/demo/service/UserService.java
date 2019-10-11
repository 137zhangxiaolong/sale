package com.ambow.springboot.demo.service;

import com.ambow.springboot.demo.model.User;

public interface UserService {

    public User login(String name,String pwd);
}
