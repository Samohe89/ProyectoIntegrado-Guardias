package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.ProfesorRoles;
import com.daw.repositories.ProfesorRolesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfesorRolesService {

    private final ProfesorRolesRepository repository;

    public List<ProfesorRoles> findAll() {
        return repository.findAll();
    }

    public Optional<ProfesorRoles> findById(Long id) {
        return repository.findById(id);
    }

    public ProfesorRoles save(ProfesorRoles profesorRol) {
        return repository.save(profesorRol);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}

