package com.daw.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Horario;
import com.daw.services.HorarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/horarios")
@CrossOrigin(origins = "http://localhost:4200") // URL del Frontend
@RequiredArgsConstructor
public class HorarioController {

	private final HorarioService service;

	@GetMapping("/profesor/{dni}/{curso}")
	public List<Horario> obtenerHorariosPorProfesorYCurso(@PathVariable("dni") String dniProfesor,
			@PathVariable("curso") String cursoAcademico) {
		return service.obtenerHorariosPorProfesorYCurso(dniProfesor, cursoAcademico);
	}

}
