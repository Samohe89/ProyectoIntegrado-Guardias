package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.GuardiasProfesor;
import com.daw.repositories.GuardiasProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuardiasProfesorService {

    private final GuardiasProfesorRepository repository;

    public List<GuardiasProfesor> findAll() {
        return repository.findAll();
    }

    public Optional<GuardiasProfesor> findById(Long id) {
        return repository.findById(id);
    }

    public GuardiasProfesor save(GuardiasProfesor guardia) {
        return repository.save(guardia);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}