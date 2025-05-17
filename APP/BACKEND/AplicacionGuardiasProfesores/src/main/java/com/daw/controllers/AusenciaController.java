package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Ausencia;
import com.daw.dto.AusenciaDTO;
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
	
	@PostMapping("/registroAusencia")
	public ResponseEntity<Ausencia> crearRegistroAusencia(@RequestBody AusenciaDTO ausenciaDTO) {
	    Ausencia nuevaAusencia = service.crearRegistroAusencia(ausenciaDTO);
	    return ResponseEntity.ok(nuevaAusencia);
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
