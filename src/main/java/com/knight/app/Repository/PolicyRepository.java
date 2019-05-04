package com.knight.app.Repository;

import com.knight.app.entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface PolicyRepository extends JpaRepository<Policy, String> { }
