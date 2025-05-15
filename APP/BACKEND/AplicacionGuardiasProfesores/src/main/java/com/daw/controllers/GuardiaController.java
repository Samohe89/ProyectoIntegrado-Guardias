package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.Guardia;
import com.daw.services.GuardiaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/guardias")
@RequiredArgsConstructor
public class GuardiaController {

    private final GuardiaService service;

    @GetMapping
    public List<Guardia> buscarTodasGuardias() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Guardia> buscarGuardiasPorId(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Guardia createGuardia(@RequestBody Guardia guardia) {
        return service.save(guardia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Guardia> updateGuardia(@PathVariable Long id, @RequestBody Guardia updatedGuardia) {
        return service.findById(id)
                .map(existing -> {
                    updatedGuardia.setIdGuardia(id);
                    return ResponseEntity.ok(service.save(updatedGuardia));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuardia(@PathVariable Long id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

