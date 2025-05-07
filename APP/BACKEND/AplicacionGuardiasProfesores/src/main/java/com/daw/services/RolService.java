package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Rol;
import com.daw.repositories.RolRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RolService {

    private final RolRepository repository;

    public List<Rol> findAll() {
        return repository.findAll();
    }

    public Optional<Rol> findById(String rol) {
        return repository.findById(rol);
    }

    public Rol save(Rol rol) {
        return repository.save(rol);
    }

    public void deleteById(String rol) {
        repository.deleteById(rol);
    }
}
