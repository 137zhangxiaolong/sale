package com.ambow.springboot.demo.mapper;

import com.ambow.springboot.demo.model.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {

    public User getUserByName(@Param("name") String name);
}
