package com.daw.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Ausencia;
import com.daw.dto.AusenciaDTO;
import com.daw.errors.ApiError;
import com.daw.exceptions.FicheroTareaNoEncontradoException;
import com.daw.services.AusenciaService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ausencias")
@CrossOrigin(origins = "http://localhost:4200") // URL del Frontend
@RequiredArgsConstructor
public class AusenciaController {

	private final AusenciaService service;

	@GetMapping
	public List<Ausencia> getAll() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Ausencia> getAusenciaPorId(@PathVariable("id") Long idAusencia) {
		Ausencia ausencia = service.getAusenciaPorId(idAusencia);
		return ResponseEntity.ok(ausencia);
	}

	// Endpoint para cargar el fichero adjunto a una tarea
	/* Especifica que se produce o envía un PDF */
	@GetMapping(value = "/{id}/fichero", produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<byte[]> descargarFicheroTarea(@PathVariable Long id) {
		Ausencia ausencia = service.getAusenciaPorId(id);
		String asignatura = ausencia.getHorariosProfesor().getAsignatura();
		byte[] blob = service.getFicheroTarea(id);

		// Construye la respuesta como flujo genérico de bytes
		return ResponseEntity.ok()
				// Se indica que el contenido es un PDF
				.contentType(MediaType.APPLICATION_PDF)
				/*
				 * Define al cliente que debe mostrar el fichero dentro del navegador (inline)
				 * Si no consigue mostrar el fichero, lo descarga "filename" especifica el
				 * nombre del fichero y su extensión
				 */
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"tarea-" + asignatura + ".pdf\"")
				// Permitir el acceso a la cabecera para recuperar el nombre del fichero
				.header("Access-Control-Expose-Headers", "Content-Disposition").body(blob);
	}

	@GetMapping("/fecha")
	public ResponseEntity<List<Ausencia>> getAusenciasPorFecha(@RequestParam("fecha") LocalDate fecha) {
		List<Ausencia> ausencias = service.getAusenciasPorFechaOrdenadasPorHora(fecha);
		return ResponseEntity.ok(ausencias);
	}

	@GetMapping("/fechas")
	public ResponseEntity<List<Ausencia>> getAusenciasEntreFechas(
			@RequestParam("fechaDesde") LocalDate fechaDesde,
			@RequestParam("fechaHasta") LocalDate fechaHasta) {
		List<Ausencia> ausencias = service.getAusenciasPorFechaOrdenadasPorHora(fechaDesde, fechaHasta);
		return ResponseEntity.ok(ausencias);
	}

	@GetMapping("/filtroGuardias")
	public ResponseEntity<List<Ausencia>> getAusenciasFiltradas(
			@RequestParam(required = false) LocalDate fechaDesde,
			@RequestParam(required = false) LocalDate fechaHasta,
			@RequestParam(required = false) String profesorGuardia) {
		List<Ausencia> ausencias = service.getAusenciasFiltradasOrdenadasPorFechaYHora(fechaDesde, fechaHasta, profesorGuardia);
		return ResponseEntity.ok(ausencias);
	}

	/*
	 * getAusenciasEntreFechasPorProfesorGuardia(fechaDesde: string, fechaHasta:
	 * string, idProfesorGuardia: string): Observable<any[]> { return
	 * this.http.get<any[]>(`${this.apiUrl}/filtroGuardias?fechaDesde=${fechaDesde}&
	 * fechaHasta=${fechaHasta}&idProfesorGuardia=${fechaHasta}`); }
	 * 
	 */

	@PostMapping
	public Ausencia create(@RequestBody Ausencia ausencia) {
		return service.save(ausencia);
	}

//	@PostMapping("/registroAusencia")
//	public ResponseEntity<Ausencia> crearRegistroAusencia(@RequestBody AusenciaDTO ausenciaDTO) {
//	    Ausencia nuevaAusencia = service.crearRegistroAusencia(ausenciaDTO);
//	    return ResponseEntity.ok(nuevaAusencia);
//	}
	@PostMapping("/registroAusencia")
	public ResponseEntity<?> crearRegistroAusencia(@RequestBody AusenciaDTO ausenciaDTO) {
		try {
			LocalDate fecha = ausenciaDTO.getFechaAusencia();
			if (fecha == null) {
				return ResponseEntity.badRequest().body("Fecha de ausencia no puede ser nula.");
			}
			int diaSemana = fecha.getDayOfWeek().getValue(); // 1=lunes ... 7=domingo
			if (diaSemana == 6 || diaSemana == 7) { // sábado o domingo
				return ResponseEntity.badRequest().body("No se pueden registrar ausencias en fines de semana.");
			}

			// Directamente crear la ausencia
			Ausencia nuevaAusencia = service.crearRegistroAusencia(ausenciaDTO);
			return ResponseEntity.ok(nuevaAusencia);

	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar la ausencia: " + e.getMessage());
	    }
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

	// MANEJO DE EXCEPCIONES

	@ExceptionHandler(FicheroTareaNoEncontradoException.class)
	public ResponseEntity<ApiError> handleFicheroNoEncontrado(FicheroTareaNoEncontradoException ex,
			HttpServletRequest req) {
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.NOT_FOUND.toString());
		apiError.setFecha(LocalDateTime.now());
		apiError.setMensaje(ex.getMessage());
		apiError.setPath(req.getServletPath());
		return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
	}

}
