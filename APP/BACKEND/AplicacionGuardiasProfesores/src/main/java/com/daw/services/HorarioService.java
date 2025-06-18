package com.daw.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Horario;
import com.daw.repositories.HorarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HorarioService {

	private final HorarioRepository repository;
	   
    public List<Horario> obtenerHorariosPorProfesorYCurso(String dniProfesor, String cursoAcademico) {
        return repository.findByProfesorIdDniProfesorAndProfesorIdCursoAcademico(dniProfesor, cursoAcademico);
    }
}

