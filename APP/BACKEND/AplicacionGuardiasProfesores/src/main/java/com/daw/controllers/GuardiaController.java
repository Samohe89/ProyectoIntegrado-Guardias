package com.daw.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Guardia;
import com.daw.dto.ProfesorTotalHorasGuardiaDTO;
import com.daw.services.GuardiaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/guardias")
@CrossOrigin(origins = "http://localhost:4200")	// URL del Frontend
@RequiredArgsConstructor
public class GuardiaController {

    private final GuardiaService guardiaService;

    @GetMapping
    public List<Guardia> getAllGuardias() {
        return guardiaService.findAll();
    }
    
    
    @GetMapping("/tramos/{id}")
    public ResponseEntity<List<Integer>> getTramosporUdAusencia (@PathVariable("id") Long idAusencia) {
    	List<Integer> tramos = guardiaService.getTramosPorIdAusencia(idAusencia);
    	return ResponseEntity.ok(tramos);
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

