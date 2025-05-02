package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.HorariosProfesor;
import com.daw.repositories.HorarioProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HorariosProfesorService {

    private final HorarioProfesorRepository repository;

    public List<HorariosProfesor> findAll() {
        return repository.findAll();
    }

    public Optional<HorariosProfesor> findById(Integer id) {
        return repository.findById(id);
    }

    public HorariosProfesor save(HorariosProfesor horario) {
        return repository.save(horario);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}

