package com.daw.controllers;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Guardia;
import com.daw.dto.ProfesorTotalHorasGuardiaDTO;
import com.daw.dto.GuardiaDTO;
import com.daw.errors.ApiError;
import com.daw.exceptions.GuardiaNoEncontradaException;
import com.daw.services.GuardiaService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/guardias")
@CrossOrigin(origins = "http://localhost:4200") // URL del Frontend
@RequiredArgsConstructor
public class GuardiaController {

	private final GuardiaService guardiaService;

	@GetMapping
	public List<Guardia> getAllGuardias() {
		return guardiaService.findAll();
	}

	@GetMapping("/ausencia/{id}")
	public ResponseEntity<List<Guardia>> getGuardiasPorIdAusencia(@PathVariable("id") Long idAusencia) {
		List<Guardia> guardias = guardiaService.getGuardiasPorIdAusencia(idAusencia);
		return ResponseEntity.ok(guardias);
	}

	@GetMapping("/tramos/{id}")
	public ResponseEntity<List<Integer>> getTramosPorIdAusencia(@PathVariable("id") Long idAusencia) {
		List<Integer> tramos = guardiaService.getTramosPorIdAusencia(idAusencia);
		return ResponseEntity.ok(tramos);
	}

	@PostMapping("/registrar")
	public ResponseEntity<List<Guardia>> registrarGuardias(@RequestBody List<GuardiaDTO> guardiasDTO) {
		List<Guardia> guardias = guardiaService.registrarGuardias(guardiasDTO);
		return ResponseEntity.ok(guardias);
	}

	@DeleteMapping("/eliminar/{idGuardia}")
	public ResponseEntity<String> eliminarGuardiaPorId(@PathVariable Long idGuardia) {
		guardiaService.eliminarGuardiaPorId(idGuardia);
		return ResponseEntity.ok().body("Guardia eliminada correctamente");
	}
	
	

	// MANEJO DE EXCEPCIONES

	@ExceptionHandler(GuardiaNoEncontradaException.class)
	public ResponseEntity<ApiError> handleUsuarioNoEncontrado(GuardiaNoEncontradaException ex, HttpServletRequest req) {
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.NOT_FOUND.toString());
		apiError.setFecha(LocalDateTime.now());
		apiError.setMensaje(ex.getMessage());
		apiError.setPath(req.getServletPath());
		return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
	}

    
    //Método para obtener el total de horas de guardia por profesor
    @GetMapping("/totalHoras")
    public List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHoras(
    		// ISO espera que el parámetro sea un string en formato YYYY-MM-DD y lo convierte a LocalDate automáticamente
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaDesde,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaHasta,
        @RequestParam(name = "profesorFiltro", required = false) String profesorFiltro,
        @RequestParam(name = "perfil", required = false) String perfil) {

        if (profesorFiltro != null) {
            profesorFiltro = profesorFiltro.trim();
            if (profesorFiltro.isEmpty() || profesorFiltro.equalsIgnoreCase("null")) {
                profesorFiltro = null;
            }
        }

        if ("profesor".equalsIgnoreCase(perfil)) {
            // Para perfil profesor filtramos por DNI
            return guardiaService.obtenerTotalHorasPorDni(fechaDesde, fechaHasta, profesorFiltro);
        } else {
            // Para directivo usamos otra query (por nombre o sin filtro)
            return guardiaService.obtenerTotalHorasPorNombre(fechaDesde, fechaHasta, profesorFiltro);
        }
    }
    

}
