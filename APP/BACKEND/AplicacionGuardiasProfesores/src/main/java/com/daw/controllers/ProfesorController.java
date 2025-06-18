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
@CrossOrigin(origins = "http://localhost:4200") // URL del Frontend
@RequiredArgsConstructor
public class ProfesorController {

	private final ProfesorService service;

	@GetMapping
	public List<Profesor> getAll() {
		return service.findAll();
	}

}
