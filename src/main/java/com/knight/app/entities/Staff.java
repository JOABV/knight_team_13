package com.knight.app.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Staff {
    @Id
    private String phone_number;
    private String password;

    public Staff() {
    }

    public Staff(String phone_number, String password) {
        this.phone_number = phone_number;
        this.password = password;
    }

    public String getPhone() {
        return phone_number;
    }

    public void setPhone(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Staff{" +
                ", phone='" + phone_number + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
