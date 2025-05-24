package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Horario;
import com.daw.datamodel.entities.ProfesorId;
import com.daw.repositories.HorarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HorarioService {

    private final HorarioRepository repository;

    public List<Horario> findAll() {
        return repository.findAll();
    }

    public Optional<Horario> findById(Integer id) {
        return repository.findById(id);
    }

    public Horario save(Horario horario) {
        return repository.save(horario);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
    
    public List<Horario> obtenerHorariosPorProfesorYCurso(String dniProfesor, String cursoAcademico) {
        return repository.findByProfesor_Id_DniProfesorAndProfesor_Id_CursoAcademico(dniProfesor, cursoAcademico);
    }
}

