package com.knight.app.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Policy {
    @Id
    String policy_number;
    String time;
    String place;
    String reason;
    String remark;
    String price;
    String picture;
    int claim_status;

    public String getPolicy_number() {
        return policy_number;
    }

    public void setPolicy_number(String policy_number) {
        this.policy_number = policy_number;
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

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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

    public int getClaim_status() {
        return claim_status;
    }

    public void setClaim_status(int claim_status) {
        this.claim_status = claim_status;
    }

    @Override
    public String toString() {
        return "Policy{" +
                "policy_number='" + policy_number + '\'' +
                ", time='" + time + '\'' +
                ", place='" + place + '\'' +
                ", reason='" + reason + '\'' +
                ", remark='" + remark + '\'' +
                ", price='" + price + '\'' +
                ", picture='" + picture + '\'' +
                ", claim_status=" + claim_status +
                '}';
    }
}
