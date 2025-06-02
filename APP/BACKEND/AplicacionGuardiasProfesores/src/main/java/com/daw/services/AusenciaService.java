package com.daw.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Ausencia;
import com.daw.datamodel.entities.Horario;
import com.daw.datamodel.entities.Profesor;
import com.daw.dto.AusenciaDTO;
import com.daw.exceptions.AusenciasNoEncontradasException;
import com.daw.repositories.AusenciaRepository;
import com.daw.repositories.HorarioRepository;
import com.daw.repositories.ProfesorRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AusenciaService {
	
	private final AusenciaRepository repository;
	
	private final HorarioRepository horarioRepository;
	
	private final ProfesorRepository profesorRepository;

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
    
    public Ausencia crearRegistroAusencia(AusenciaDTO ausenciaDTO) {
    	
    	//Crear y rellenar la ausencia
    	Ausencia ausencia = new Ausencia();
    	ausencia.setFechaAusencia(ausenciaDTO.getFechaAusencia());
    	ausencia.setComentario(ausenciaDTO.getComentario());
    	
    	Horario horario = horarioRepository.findById(ausenciaDTO.getNumRegistro())
    		    .orElseThrow(() -> new RuntimeException("No existe el horario con ID: " + ausenciaDTO.getNumRegistro()));
    	
    	ausencia.setHorariosProfesor(horario);
    	
    	Profesor profesor = profesorRepository.findById(ausenciaDTO.getId())
    		    .orElseThrow(() -> new RuntimeException("No existe el profesor con ID: " + ausenciaDTO.getId()));
    	
    	ausencia.setProfesor(profesor);
    	
    	//Guardar en base de datos
    	return repository.save(ausencia);
    	
    }
    
    
       
    public List<Ausencia> getAusenciasPorFechaOrdenadasPorHora(LocalDate fecha) {
    	List<Ausencia> ausencias = repository.findByFechaOrdenPorHora(fecha);
        if (ausencias.isEmpty()) {
            throw new AusenciasNoEncontradasException();
        }
        return ausencias;
    }
    
    public List<Ausencia> getAusenciasPorFechaOrdenadasPorHora(LocalDate fechaDesde, LocalDate fechaHasta) {
    	List<Ausencia> ausencias = repository.findByFechasOrdenPorFechaYHora(fechaDesde, fechaHasta);
        if (ausencias.isEmpty()) {
            throw new AusenciasNoEncontradasException();
        }
        return ausencias;
    }
    
    


}
