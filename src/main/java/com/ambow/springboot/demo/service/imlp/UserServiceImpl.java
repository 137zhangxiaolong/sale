package com.ambow.springboot.demo.service.imlp;

import com.ambow.springboot.demo.common.exception.CustomException;
import com.ambow.springboot.demo.mapper.UserMapper;
import com.ambow.springboot.demo.model.User;
import com.ambow.springboot.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl  implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(String name, String pwd) {
        User loginUser = userMapper.getUserByName(name);
        if(loginUser!=null && loginUser.getPwd().equals(pwd)){
            return loginUser;
        }
        throw new CustomException(2000,"用户名或密码错误");
    }
}
