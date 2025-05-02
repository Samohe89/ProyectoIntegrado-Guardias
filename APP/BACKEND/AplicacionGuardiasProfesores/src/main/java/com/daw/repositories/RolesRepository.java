package com.daw.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.Roles;

public interface RolesRepository extends JpaRepository<Roles, String> {

}
