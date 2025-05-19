package com.daw.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Ausencia;
import com.daw.exceptions.AusenciasNoEncontradasException;
import com.daw.repositories.AusenciaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AusenciaService {
	
	private final AusenciaRepository ausenciaRepository;
	
	/*
    public List<Ausencia> findAll() {
        return repository.findAll();
    }

    public Optional<Ausencia> findById(Long id) {
        return repository.findById(id);
    }

    public Ausencia save(Ausencia ausencia) {
        return repository.save(ausencia);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
  */
	

    public List<Ausencia> getAusenciasPorFecha(LocalDate fecha) {
    	List<Ausencia> ausencias = ausenciaRepository.findByFechaOrdenPorHora(fecha);
        
        if (ausencias.isEmpty()) {
            throw new AusenciasNoEncontradasException(fecha);
        }

        return ausencias;
    }
	
}
