package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.ProfesorRol;
import com.daw.repositories.ProfesorRolRepository;
import com.daw.datamodel.entities.ProfesorRolId;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfesorRolService {

    private final ProfesorRolRepository repository;

    public List<ProfesorRol> findAll() {
        return repository.findAll();
    }

    public Optional<ProfesorRol> findById(ProfesorRolId id) {
        return repository.findById(id);
    }

    public ProfesorRol save(ProfesorRol profesorRol) {
        return repository.save(profesorRol);
    }

    public void deleteById(ProfesorRolId id) {
        repository.deleteById(id);
    }
}
