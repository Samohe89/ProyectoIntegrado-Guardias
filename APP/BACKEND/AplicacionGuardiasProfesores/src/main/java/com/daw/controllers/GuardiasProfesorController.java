package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.GuardiasProfesor;
import com.daw.services.GuardiasProfesorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/guardias")
@RequiredArgsConstructor
public class GuardiasProfesorController {

    private final GuardiasProfesorService service;

    @GetMapping
    public List<GuardiasProfesor> buscarTodasGuardias() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuardiasProfesor> buscarGuardiasPorId(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GuardiasProfesor createGuardia(@RequestBody GuardiasProfesor guardia) {
        return service.save(guardia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuardiasProfesor> updateGuardia(@PathVariable Long id, @RequestBody GuardiasProfesor updatedGuardia) {
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

