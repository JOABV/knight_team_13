package com.knight.app.Repository;

import com.knight.app.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface StaffRepository extends JpaRepository<Staff, String> {

}
