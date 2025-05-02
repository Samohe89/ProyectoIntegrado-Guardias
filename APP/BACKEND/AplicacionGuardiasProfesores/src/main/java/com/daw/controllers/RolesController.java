package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.Roles;
import com.daw.services.RolesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RolesController {

    private final RolesService service;

    @GetMapping
    public List<Roles> getAll() {
        return service.findAll();
    }

    @GetMapping("/{rol}")
    public ResponseEntity<Roles> getById(@PathVariable String rol) {
        return service.findById(rol)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Roles create(@RequestBody Roles rol) {
        return service.save(rol);
    }

    @PutMapping("/{rol}")
    public ResponseEntity<Roles> update(@PathVariable String rol, @RequestBody Roles updatedRol) {
        return service.findById(rol)
                .map(existing -> {
                    updatedRol.setRol(rol);
                    return ResponseEntity.ok(service.save(updatedRol));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{rol}")
    public ResponseEntity<Void> delete(@PathVariable String rol) {
        if (service.findById(rol).isPresent()) {
            service.deleteById(rol);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
