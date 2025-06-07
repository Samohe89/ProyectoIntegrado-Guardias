package com.daw.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Guardia;
import com.daw.dto.ProfesorTotalHorasGuardiaDTO;
import com.daw.repositories.GuardiaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuardiaService {

    private final GuardiaRepository guardiaRepository;

    public List<Guardia> findAll() {
        return guardiaRepository.findAll();
    }

    // public Optional<Guardia> findById(Long id) {
    //     return guardiaRepository.findById(id);
    // }

    public Guardia save(Guardia guardia) {
        return guardiaRepository.save(guardia);
    }

    public void deleteById(Long id) {
        guardiaRepository.deleteById(id);
    }
    
    //Método para obtener el total de horas de guardia por profesor
    public List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorDni(LocalDate desde, LocalDate hasta, String dniProfesor) {
        return guardiaRepository.obtenerTotalHorasPorDni(desde, hasta, dniProfesor);
    }

    public List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorNombre(LocalDate desde, LocalDate hasta, String nombreProfesor) {
        return guardiaRepository.obtenerTotalHorasPorNombre(desde, hasta, nombreProfesor);
    }
    
   public List<Integer> getTramosPorIdAusencia(Long idAusencia) {
	   List<Guardia> guardias = guardiaRepository.findGuardiasPorIdAusencias(idAusencia);
	   List<Integer> tramos = new ArrayList<>();
	   for (Guardia guardia : guardias) {
		   tramos.add(guardia.getTramo());
	   }
	   return tramos;
	   
   }
}