package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Roles;
import com.daw.repositories.RolesRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RolesService {

    private final RolesRepository repository;

    public List<Roles> findAll() {
        return repository.findAll();
    }

    public Optional<Roles> findById(String rol) {
        return repository.findById(rol);
    }

    public Roles save(Roles rol) {
        return repository.save(rol);
    }

    public void deleteById(String rol) {
        repository.deleteById(rol);
    }
}
