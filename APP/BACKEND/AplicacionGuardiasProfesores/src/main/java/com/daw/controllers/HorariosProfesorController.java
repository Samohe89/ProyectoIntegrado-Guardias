package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.HorariosProfesor;
import com.daw.services.HorariosProfesorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/horarios")
@RequiredArgsConstructor
public class HorariosProfesorController {

    private final HorariosProfesorService service;

    @GetMapping
    public List<HorariosProfesor> getAllHorarios() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorariosProfesor> getHorarioById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public HorariosProfesor createHorario(@RequestBody HorariosProfesor horario) {
        return service.save(horario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorariosProfesor> updateHorario(@PathVariable Integer id, @RequestBody HorariosProfesor updatedHorario) {
        return service.findById(id)
                .map(existing -> {
                    updatedHorario.setNumRegistro(id.intValue());
                    return ResponseEntity.ok(service.save(updatedHorario));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHorario(@PathVariable Integer id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

