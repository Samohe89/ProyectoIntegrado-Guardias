package com.daw.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Horario;
import com.daw.errors.ApiError;
import com.daw.exceptions.TramoNoDisponibleException;
import com.daw.services.HorarioService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/horarios")
@RequiredArgsConstructor
public class HorarioController {

    private final HorarioService service;

    @GetMapping
    public List<Horario> getAllHorarios() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Horario> getHorarioById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    //Método que obtiene profesor por dni y curso
    @GetMapping("/profesor/{dni}/{curso}")
    public List<Horario> getHorariosPorProfesorYCurso(
        @PathVariable("dni") String dniProfesor,
        @PathVariable("curso") String cursoAcademico) {
        return service.obtenerHorariosPorProfesorYCurso(dniProfesor, cursoAcademico);
    }

    @PostMapping
    public Horario createHorario(@RequestBody Horario horario) {
        return service.save(horario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Horario> updateHorario(@PathVariable Integer id, @RequestBody Horario updatedHorario) {
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
    
	// MANEJO DE EXCEPCIONES
	
	@ExceptionHandler(TramoNoDisponibleException.class)
	public ResponseEntity<ApiError> handleTramoNoDisponible(TramoNoDisponibleException ex, HttpServletRequest req) {
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.NOT_FOUND.toString());
		apiError.setFecha(LocalDateTime.now());
		apiError.setMensaje(ex.getMessage());
		apiError.setPath(req.getServletPath());
		return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
		
	}
}

