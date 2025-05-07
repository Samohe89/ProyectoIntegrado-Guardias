package com.daw.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.Rol;

public interface RolRepository extends JpaRepository<Rol, String> {

}
