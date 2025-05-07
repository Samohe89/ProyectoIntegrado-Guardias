package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.daw.datamodel.entities.Ausencia;
import com.daw.services.AusenciaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ausencias")
@RequiredArgsConstructor
public class AusenciaController {

	private final AusenciaService service;

	@GetMapping
	public List<Ausencia> getAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Ausencia> getById(@PathVariable Long id) {
		return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Ausencia create(@RequestBody Ausencia ausencia) {
		return service.save(ausencia);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Ausencia> update(@PathVariable Long id, @RequestBody Ausencia updated) {
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
