package com.daw.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Guardia;
import com.daw.repositories.GuardiaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuardiaService {

    private final GuardiaRepository guardiaRepository;

    public List<Guardia> findAll() {
        return guardiaRepository.findAll();
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