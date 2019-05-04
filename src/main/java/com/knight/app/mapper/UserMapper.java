package com.knight.app.mapper;

import com.knight.app.entities.User;
import org.apache.ibatis.annotations.*;

//指定这是一个操作数据库的mapper
//@Mapper
public interface UserMapper {

    @Select("select * from User where phone_number=#{phone_number}")
    public User getUserByPhone(String phone_number);

    @Delete("delete from User where phone_number=#{phone_number}")
    public int deleteUserByPhone(String phone_number);

//    @Options(useGeneratedKeys = true,keyProperty = "id")
//    @Insert("insert into department(department_name) values(#{})")
//    public int insertDept(User user);

    @Update("update User set email=#{email} where phone_number=#{phone_number}")
    public int updateUser(User user);

}
