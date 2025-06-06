package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Guardia;
import com.daw.dto.GuardiaDTO;
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
    
    
    @GetMapping("/{id}")
    public ResponseEntity<List<Guardia>> getGuardiasPorIdAusencia (@PathVariable("id") Long idAusencia) {
    	List<Guardia> guardias = guardiaService.getGuardiasPorIdAusencia(idAusencia);
    	return ResponseEntity.ok(guardias);
    }
        
    
    @GetMapping("/tramos/{id}")
    public ResponseEntity<List<Integer>> getTramosPorIdAusencia (@PathVariable("id") Long idAusencia) {
    	List<Integer> tramos = guardiaService.getTramosPorIdAusencia(idAusencia);
    	return ResponseEntity.ok(tramos);
    }
    
    
    @PostMapping("/registrar")
    public ResponseEntity<List<Guardia>> registrarGuardias (@RequestBody List<GuardiaDTO> guardiasDTO) {
    	List<Guardia> guardias = guardiaService.registrarGuardias(guardiasDTO);
    	return ResponseEntity.ok(guardias);
    }
    
    
   
}

