package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.AusenciasProfesor;
import com.daw.services.AusenciasProfesorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ausencias")
@RequiredArgsConstructor
public class AusenciasProfesorController {

	private final AusenciasProfesorService service;

	@GetMapping
	public List<AusenciasProfesor> getAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<AusenciasProfesor> getById(@PathVariable Long id) {
		return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public AusenciasProfesor create(@RequestBody AusenciasProfesor ausencia) {
		return service.save(ausencia);
	}

	@PutMapping("/{id}")
	public ResponseEntity<AusenciasProfesor> update(@PathVariable Long id, @RequestBody AusenciasProfesor updated) {
		return service.findById(id).map(existing -> {
			updated.setId(id);
			return ResponseEntity.ok(service.save(updated));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		return service.findById(id).map(existing -> {
			service.deleteById(id);
			return ResponseEntity.noContent().build();
		}).orElse(ResponseEntity.notFound().build());
	}
}
