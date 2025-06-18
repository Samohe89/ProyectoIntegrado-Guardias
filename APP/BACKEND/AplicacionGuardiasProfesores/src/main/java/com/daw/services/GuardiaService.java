package com.daw.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Ausencia;
import com.daw.datamodel.entities.Guardia;
import com.daw.datamodel.entities.Profesor;
import com.daw.dto.GuardiaDTO;
import com.daw.dto.ProfesorTotalHorasGuardiaDTO;
import com.daw.exceptions.AusenciasNoEncontradasException;
import com.daw.exceptions.GuardiaNoEncontradaException;
import com.daw.repositories.AusenciaRepository;
import com.daw.repositories.GuardiaRepository;
import com.daw.repositories.ProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class GuardiaService {

	private final GuardiaRepository guardiaRepository;
	private final ProfesorRepository profesorRepository;
	private final AusenciaRepository ausenciaRepository;

	public List<Guardia> findAll() {
		return guardiaRepository.findAll();
	}

	public List<Guardia> getGuardiasPorIdAusencia(Long idAusencia) {
		List<Guardia> guardias = guardiaRepository.findGuardiasPorIdAusencia(idAusencia);
		return guardias;
	}

	public List<Integer> getTramosPorIdAusencia(Long idAusencia) {
		List<Guardia> guardias = guardiaRepository.findGuardiasPorIdAusencia(idAusencia);
		List<Integer> tramos = new ArrayList<>();
		for (Guardia guardia : guardias) {
			tramos.add(guardia.getTramo());
		}
		return tramos;
	}

	public List<Guardia> registrarGuardias(List<GuardiaDTO> guardiasDTO) {
		List<Guardia> guardias = new ArrayList<>();

		for (GuardiaDTO dto : guardiasDTO) {
			Guardia guardia = new Guardia();
			guardia.setGrupo(dto.getGrupo());
			guardia.setTramo(dto.getTramo());

			// Asignar duración en función del tramo
			if (dto.getTramo() >= 1 && dto.getTramo() <= 4) {
				guardia.setDuracion(15);
			} else if (dto.getTramo() == 5) {
				guardia.setDuracion(60);
			} else {
				throw new IllegalArgumentException("Tramo no válido: " + dto.getTramo());
			}

			// Obtener el profesor por clave compuesta
			Optional<Profesor> profesor = profesorRepository.findById(dto.getIdProfesorGuardia());
			if (profesor.isEmpty()) {
				throw new RuntimeException("No existe el profesor con ID: " + dto.getIdProfesorGuardia());
			}
			guardia.setProfesor(profesor.get());

			// Obtener la ausencia por id
			Optional<Ausencia> ausencia = ausenciaRepository.findById(dto.getIdAusencia());

			if (ausencia.isEmpty()) {
				throw new AusenciasNoEncontradasException();
			}

			guardia.setAusenciasProfesor(ausencia.get());

			guardias.add(guardia);
		}

		return guardiaRepository.saveAll(guardias);
	}

	
	public void eliminarGuardiaPorId(Long idGuardia) {
		Optional<Guardia> guardia = guardiaRepository.findById(idGuardia);
		if (guardia.isEmpty()) {
			throw new GuardiaNoEncontradaException(idGuardia);
		}
		guardiaRepository.delete(guardia.get());
	}

    
    //Métodos para obtener el total de horas de guardia por profesor
    public List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorDni(LocalDate desde, LocalDate hasta, String dniProfesor) {
        return guardiaRepository.obtenerTotalHorasPorDni(desde, hasta, dniProfesor);
    }

    public List<ProfesorTotalHorasGuardiaDTO> obtenerTotalHorasPorNombre(LocalDate desde, LocalDate hasta, String nombreProfesor) {
        return guardiaRepository.obtenerTotalHorasPorNombre(desde, hasta, nombreProfesor);
    }
    

}