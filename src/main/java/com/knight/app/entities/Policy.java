package com.knight.app.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Policy {
    @Id
    private String policy_number;
    private String policy_name;
    private String phone_number;
    private String time;
    private String place;
    private String reason;
    private String price;
    private String picture;
    private String claim_status;

    public Policy() {
    }

    public Policy(String policy_number, String policy_name, String phone_number, String time, String place, String reason, String price, String picture, String claim_status) {
        this.policy_number = policy_number;
        this.policy_name = policy_name;
        this.phone_number = phone_number;
        this.time = time;
        this.place = place;
        this.reason = reason;
        this.price = price;
        this.picture = picture;
        this.claim_status = claim_status;
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
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

    public String getClaim_status() {
        return claim_status;
    }

    public void setClaim_status(String claim_status) {
        this.claim_status = claim_status;
    }
}
