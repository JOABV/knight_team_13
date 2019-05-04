package com.knight.app.mapper;

import com.knight.app.entities.Policy;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

//指定这是一个操作数据库的mapper
//@Mapper
public interface PolicyMapper {

//    @Select("select * from department where id=#{id}")
//    public Department getDeptById(Integer id);
//
//    @Delete("delete from department where id=#{id}")
//    public int deleteDeptById(Integer id);
//
//    @Options(useGeneratedKeys = true,keyProperty = "id")
//    @Insert("insert into department(department_name) values(#{departmentName})")
//    public int insertDept(Department department);
//
//    @Update("update department set department_name=#{departmentName} where id=#{id}")
//    public int updateDept(Department department);

    @Select("select policy_number, policy_name, time from Policy where phone_number=#{phone_number}")
    public List<Policy> getPolicyByPhoneNumber(@Param("phone_number") String phone_number);

}
