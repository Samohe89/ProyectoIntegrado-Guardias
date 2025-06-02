package com.daw.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Guardia;
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
    
    
   
}

