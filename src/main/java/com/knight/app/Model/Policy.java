package com.knight.app.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Policy {
    @Id
    int id;
    String policy_number;
    String time;
    String date;
    String reason;
    String remark;
    String price;

    public Policy() {
    }

    public Policy(String policy_number, String time, String date, String reason, String remark, String price) {
        this.policy_number = policy_number;
        this.time = time;
        this.date = date;
        this.reason = reason;
        this.remark = remark;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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

    @Override
    public String toString() {
        return "Policy{" +
                "id=" + id +
                ", policy_number='" + policy_number + '\'' +
                ", time='" + time + '\'' +
                ", date='" + date + '\'' +
                ", reason='" + reason + '\'' +
                ", remark='" + remark + '\'' +
                ", price='" + price + '\'' +
                '}';
    }
}
