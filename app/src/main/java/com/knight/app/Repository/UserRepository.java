package com.knight.app.Repository;

import com.knight.app.Model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {

//    @Query("SELECT * from User WHERE id=?")
//    User findUserById(int id);
//    @Query("SELECT * from User WHERE phone=?")
//    User findUserByPhone(String phone);

}
