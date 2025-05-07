package com.daw.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.Profesor;
import com.daw.datamodel.entities.ProfesorId;

public interface ProfesorRepository extends JpaRepository<Profesor, ProfesorId>{

}
