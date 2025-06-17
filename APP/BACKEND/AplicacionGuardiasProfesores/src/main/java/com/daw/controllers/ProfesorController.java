package com.daw.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Profesor;
import com.daw.services.ProfesorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "http://localhost:4200")	// URL del Frontend
@RequiredArgsConstructor
public class ProfesorController {

    private final ProfesorService service;
    
    @GetMapping
    public List<Profesor> getAll() {
        return service.findAll();
    }

//    @GetMapping("/{dni}/{curso}")
//    public ResponseEntity<Profesor> getById(@PathVariable String dni, @PathVariable String curso) {
//    	ProfesorId id = new ProfesorId();
//        id.setDniProfesor(dni);
//        id.setCursoAcademico(curso);
//
//        return service.findById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public Profesor create(@RequestBody Profesor profesor) {
//        return service.save(profesor);
//    }
//
//    @PutMapping("/{dni}/{curso}")
//    public ResponseEntity<Profesor> update(@PathVariable String dni,
//                                           @PathVariable String curso,
//                                           @RequestBody Profesor updated) {
//    	ProfesorId id = new ProfesorId();
//        id.setDniProfesor(dni);
//        id.setCursoAcademico(curso);
//
//        return service.findById(id).map(existing -> {
//            updated.setId(id);
//            return ResponseEntity.ok(service.save(updated));
//        }).orElse(ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping("/{dni}/{curso}")
//    public ResponseEntity<Object> delete(@PathVariable String dni, @PathVariable String curso) {
//    	ProfesorId id = new ProfesorId();
//        id.setDniProfesor(dni);
//        id.setCursoAcademico(curso);
//
//        return service.findById(id).map(existing -> {
//            service.deleteById(id);
//            return ResponseEntity.noContent().build();
//        }).orElse(ResponseEntity.notFound().build());
//    }

}

