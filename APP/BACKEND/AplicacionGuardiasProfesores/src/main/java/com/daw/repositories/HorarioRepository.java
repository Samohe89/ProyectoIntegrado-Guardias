package com.daw.repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daw.datamodel.entities.Horario;


public interface HorarioRepository extends JpaRepository<Horario, Integer> {

    List<Horario> findByProfesor_Id_DniProfesorAndProfesor_Id_CursoAcademico(String dniProfesor, String cursoAcademico);
}
