package com.knight.app.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    @Id
    private String phone_number;
    private String password;
    private String photo;
    private String id_number;
    private String full_name;
    private String email;

    public User() {
    }

    public User(String phone_number, String password) {
        this.phone_number = phone_number;
        this.password = password;
        this.photo = "";
        this.id_number = "";
        this.full_name = "";
        this.email = "";
    }

    public User(String phone_number, String password, String photo, String id_number, String full_name, String email) {
        this.phone_number = phone_number;
        this.password = password;
        this.photo = photo;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
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
        full_name = full_name;
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
                ", phone='" + phone_number + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

