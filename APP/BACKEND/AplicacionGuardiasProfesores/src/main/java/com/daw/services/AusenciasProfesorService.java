package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.AusenciasProfesor;
import com.daw.repositories.AusenciasProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AusenciasProfesorService {
	
	private final AusenciasProfesorRepository repository;

    public List<AusenciasProfesor> findAll() {
        return repository.findAll();
    }

    public Optional<AusenciasProfesor> findById(Long id) {
        return repository.findById(id);
    }

    public AusenciasProfesor save(AusenciasProfesor ausencia) {
        return repository.save(ausencia);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
