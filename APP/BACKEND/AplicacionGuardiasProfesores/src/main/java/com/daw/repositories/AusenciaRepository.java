package com.daw.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.Ausencia;

public interface AusenciaRepository extends JpaRepository<Ausencia, Long> {


}
