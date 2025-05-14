package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.ProfesorRol;
import com.daw.datamodel.entities.ProfesorRolId;
import com.daw.repositories.ProfesorRolRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfesorRolService {

    private final ProfesorRolRepository repository;

    public List<ProfesorRol> findAll() {
        return repository.findAll();
    }

    public Optional<ProfesorRol> findById(ProfesorRolId profesorRolId) {
        return repository.findById(profesorRolId);
    }

    public ProfesorRol save(ProfesorRol profesorRol) {
        return repository.save(profesorRol);
    }

    public void deleteById(ProfesorRolId profesorRolId) {
        repository.deleteById(profesorRolId);
    }
}

