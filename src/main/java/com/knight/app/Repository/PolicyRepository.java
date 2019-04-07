package com.knight.app.Repository;

import com.knight.app.Model.Policy;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface PolicyRepository extends CrudRepository<Policy, Integer> {

}
