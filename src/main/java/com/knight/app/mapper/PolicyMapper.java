package com.knight.app.mapper;

import com.knight.app.entities.Policy;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

//指定这是一个操作数据库的mapper
//@Mapper
public interface PolicyMapper {

    // ToProcess

    @Insert("INSERT INTO claim_unprocessed ( policy_number, time, place, reason, price, picture) VALUES ( #{policy_number},#{time}, #{place}, #{reason}, #{price}, #{picture})")
    public int insertToProcess(JSONObject policy);

    @Delete("DELETE FROM claim_unprocessed WHERE policy_number = #{policy_number}")
    public int deleteToProcess(String policy_number);

    @Update("UPDATE claim_unprocessed SET time = #{time}, place = #{place}, reason = #{reason}, price= #{price}, picture= #{picture} WHERE policy_number= #{policy_number}")
    public int UpdateToProcess(JSONObject policy);

    @Select("SELECT * FROM claim_unprocessed WHERE policy_number = #{policy_number}")
    public JSONObject getOneMessageFromToProcess(@Param("policy_number") String policy_number);

    @Select("SELECT  policy_number, time, place, price FROM claim_unprocessed WHERE place= #{place} AND price = #{price} ORDER BY time LIMIT #{length}")
    public List<JSONObject> getToProcessListByOrderForLength(@Param("length") int length, @Param("place") String place, @Param("price") String price);

    @Select("SELECT  policy_number, time, place, price FROM claim_unprocessed WHERE place= #{place} AND price = #{price} ORDER BY time DESC LIMIT #{length} ")
    public List<JSONObject> getToProcessListByInvertedOrderForLength(@Param("length") int length, @Param("place") String place, @Param("price") String price);



    // Processing

    @Insert("INSERT INTO claim_processing ( policy_number, time, place, reason, price, picture, feedback, staff_number ) VALUES ( #{policy_number},#{time}, #{place}, #{reason}, #{price}, #{picture}, #{feedback} , #{staff_number} )")
    public int insertProcessing(JSONObject policy);//Only in this step the staff's phone number is added to the claim;

    @Delete("DELETE FROM claim_processing WHERE policy_number= #{policy_number}")
    public int deleteProcessing(String policy_number);

    @Update("UPDATE claim_processing SET time = #{time}, place = #{place}, reason = #{reason}, price= #{price}, picture= #{picture}, feedback= #{feedback}, staff_number= #{staff_number} WHERE policy_number= #{policy_number}")
    public int updateProcessing(JSONObject policy);

    @Select("SELECT * FROM claim_processing WHERE policy_number = #{policy_number}")
    public JSONObject getOneMessageFromProcessing(@Param("policy_number") String policy_number);

    @Select("SELECT  policy_number, time, place, price FROM claim_processing WHERE place= #{place} AND price = #{price} ORDER BY time LIMIT #{length}")
    public List<JSONObject> getProcessingListByOrderForLength(@Param("length") int length, @Param("place") String place, @Param("price") String price);

    @Select("SELECT  policy_number, time, place, price FROM claim_processing WHERE place= #{place} AND price = #{price} ORDER BY time DESC LIMIT #{length} ")
    public List<JSONObject> getProcessingListByInvertedOrderForLength(@Param("length") int length, @Param("place") String place, @Param("price") String price);



    // Processed

    @Insert("INSERT INTO claim_processed ( policy_number, time, place, reason, price, picture, feedback, staff_number ) VALUES ( #{policy_number},#{time}, #{place}, #{reason}, #{price}, #{picture}, #{feedback}, #{staff_number} )")
    public int insertProcessed(JSONObject policy);

    @Delete("DELETE FROM claim_processed WHERE policy_number= #{policy_number}")
    public int deleteProcessed(String policy_number);

    @Update("UPDATE claim_processed SET time = #{time}, place = #{place}, reason = #{reason}, price= #{price}, picture= #{picture}, feedback= #{feedback}, staff_number= #{staff_number} WHERE policy_number= #{policy_number}")
    public int updateStates(String policy_number, String states);

    @Select("SELECT * FROM claim_processed WHERE policy_number = #{policy_number}")
    public JSONObject getOneMessageFromProcessed(@Param("policy_number") String policy_number);

    @Select("SELECT  policy_number, time, place, price FROM claim_processed WHERE place= #{place} AND price = #{price}ORDER BY time LIMIT #{length} ")
    public List<JSONObject> getProcessedListByOrderForLength(@Param("length") int length, @Param("place") String place, @Param("price") String price);

    @Select("SELECT  policy_number, time, place, price FROM claim_processed WHERE place= #{place} AND price = #{price} ORDER BY time DESC LIMIT #{length}")
    public List<JSONObject> getProcessedListByInvertedOrderForLength(@Param("length") int length, @Param("place") String place, @Param("price") String price);



    //Policy
    @Insert("INSERT INTO policy (policy_number, policy_name, phone_number, start_time, end_time) VALUES (#{policy_number}, #{policy_name}, #{phone_number}, #{start_time}, #{end_time})")
    public int insertPolicy(JSONObject policy);

    @Delete("DELETE FROM policy  WHERE policy_number= #{policy_number} ")
    public int deletePolicyByPhoneNumber(@Param("policy_number") String policy_number);

    @Update("UPDATE policy SET policy_name= #{policy_name}, phone_number= #{phone_number}, start_time=#{start_time}, end_time=#{end_time} WHERE policy_number= #{policy_number}")
    public int updatePolicy(JSONObject policy);

    @Select("SELECT * FROM policy WHERE policy_number= #{policy_number}")
    public JSONObject getPolicy(@Param("policy_number") String policy_number);

    @Select("select * from policy where phone_number=#{phone_number}")
    public List<JSONObject> getPolicyByPhoneNumber(@Param("phone_number") String phone_number);



    // States

    @Insert("INSERT INTO states (policy_number, states) VALUES (#{policy_number}, #{states})")
    public int insertStates(JSONObject policy);

    @Delete("DELETE FROM states  WHERE policy_number= #{policy_number} ")
    public int DeleteStates(@Param("policy_number") String policy_number);

    @Update("UPDATE states SET states= #{states} WHERE policy_number= #{policy_number}")
    public int UpdateStates(JSONObject policy);

    @Select("SELECT * FROM states WHERE policy_number= #{policy_number}")
    public JSONObject getStates(@Param("policy_number") String policy_number);





}
