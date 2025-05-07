package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.ProfesorRol;
import com.daw.services.ProfesorRolService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profesor-roles")
//@RequiredArgsConstructor
public class ProfesorRolController {

	/*
    private final ProfesorRolesService service;

    @GetMapping
    public List<ProfesorRoles> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfesorRoles> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ProfesorRoles create(@RequestBody ProfesorRoles profesorRol) {
        return service.save(profesorRol);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfesorRoles> update(@PathVariable Long id, @RequestBody ProfesorRoles updatedRol) {
        return service.findById(id)
                .map(existing -> {
                    updatedRol.setId(id);
                    return ResponseEntity.ok(service.save(updatedRol));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


	*/
	
}