package com.knight.app.entities;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
import java.util.List;
import java.util.Map;

//@Entity
public class Policy {
//    @Id
    private String policy_number;
    private String policy_name;
    private String phone_number;
    private Date start_time;
    private Date end_time;

    @CreatedDate
    private Date time;
    private String place;
    private String reason;
    private String price;
    private String picture;

    private String feedback = "xxxx@@xxxx@@xxxx";
    private String states = "0@@0@@0";
    private String staff_number;



    public Policy() {
    }

    public Policy(String policy_number, String policy_name, String phone_number) {
        this.policy_number = policy_number;
        this.policy_name = policy_name;
        this.phone_number = phone_number;
    }

    public Policy(String policy_number, String policy_name, String phone_number, Date time, String place, String reason, String price, String picture, String states) {
        this.policy_number = policy_number;
        this.policy_name = policy_name;
        this.phone_number = phone_number;
        this.time = time;
        this.place = place;
        this.reason = reason;
        this.price = price;
        this.picture = picture;
        this.states = states;
    }

    public Policy(String policy_number, String policy_name, String phone_number, Date time, String place, String reason, String price, String picture, String feedback, String claim_states, String staff_number) {
        this.policy_number = policy_number;
        this.policy_name = policy_name;
        this.phone_number = phone_number;
        this.time = time;
        this.place = place;
        this.reason = reason;
        this.price = price;
        this.picture = picture;
        this.feedback = feedback;
        this.states = states;
        this.staff_number = staff_number;
    }

    public String getPolicy_number() {
        return policy_number;
    }

    public void setPolicy_number(String policy_number) {
        this.policy_number = policy_number;
    }

    public String getPolicy_name() {
        return policy_name;
    }

    public void setPolicy_name(String policy_name) {
        this.policy_name = policy_name;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public Date getStart_time() {
        return start_time;
    }

    public void setStart_time(Date start_time) {
        this.start_time = start_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getStates() {
        return states;
    }

    public void setStates(String states) {
        this.states = states;
    }

    public String getStaff_number() {
        return staff_number;
    }

    public void setStaff_number(String staff_number) {
        staff_number = staff_number;
    }
}
