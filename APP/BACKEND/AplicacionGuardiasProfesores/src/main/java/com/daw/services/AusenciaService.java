package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Ausencia;
import com.daw.repositories.AusenciaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AusenciaService {
	
	private final AusenciaRepository repository;

    public List<Ausencia> findAll() {
        return repository.findAll();
    }

    public Optional<Ausencia> findById(Long id) {
        return repository.findById(id);
    }

    public Ausencia save(Ausencia ausencia) {
        return repository.save(ausencia);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
