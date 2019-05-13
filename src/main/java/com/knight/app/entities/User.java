package com.knight.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    @Id
    @Column(name="phone_number")
    private String phone_number = "";

    @Column(name="password")
    private String password = "";

    @Column(name="id_number")
    private String id_number = "";

    @Column(name="full_name")
    private String full_name = "";

    @Column(name="email")
    private String email = "";

    public User() {
    }

    public User(String phone_number, String password, String id_number, String full_name) {
        this.phone_number = phone_number;
        this.password = password;
        this.id_number = id_number;
        this.full_name = full_name;
    }

    public User(String phone_number, String password, String id_number, String full_name, String email) {
        this.phone_number = phone_number;
        this.password = password;
        this.id_number = id_number;
        this.full_name = full_name;
        this.email = email;
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

    public String getId_number() {
        return id_number;
    }

    public void setId_number(String id_number) {
        this.id_number = id_number;
    }

    public String getFullname() {
        return full_name;
    }

    public void setFullname(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "phone_number='" + phone_number + '\'' +
                ", password='" + password + '\'' +
                ", id_number='" + id_number + '\'' +
                ", full_name='" + full_name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

