package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Guardia;
import com.daw.dto.ProfesorTotalHorasGuardiaDTO;
import com.daw.repositories.GuardiaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuardiaService {

    private final GuardiaRepository repository;

    public List<Guardia> findAll() {
        return repository.findAll();
    }

    public Optional<Guardia> findById(Long id) {
        return repository.findById(id);
    }

    public Guardia save(Guardia guardia) {
        return repository.save(guardia);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
    
    //Método para obtener el total de horas de guardia por profesor
    public List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorProfesor() {
        return repository.obtenerTotalHorasPorProfesor();
      
        
    }
}