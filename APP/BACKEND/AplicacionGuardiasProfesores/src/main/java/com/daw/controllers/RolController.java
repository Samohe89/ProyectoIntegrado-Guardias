package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.Rol;
import com.daw.services.RolService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RolController {

    private final RolService service;

    @GetMapping
    public List<Rol> getAll() {
        return service.findAll();
    }

    @GetMapping("/{rol}")
    public ResponseEntity<Rol> getById(@PathVariable String rol) {
        return service.findById(rol)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Rol create(@RequestBody Rol rol) {
        return service.save(rol);
    }

    @PutMapping("/{rol}")
    public ResponseEntity<Rol> update(@PathVariable String rol, @RequestBody Rol updatedRol) {
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
