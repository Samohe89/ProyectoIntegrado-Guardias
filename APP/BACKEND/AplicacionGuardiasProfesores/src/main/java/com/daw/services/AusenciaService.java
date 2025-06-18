package com.daw.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Ausencia;
import com.daw.datamodel.entities.Horario;
import com.daw.datamodel.entities.Profesor;
import com.daw.dto.AusenciaDTO;
import com.daw.exceptions.AusenciaNoEncontradaException;
import com.daw.exceptions.AusenciasNoEncontradasException;
import com.daw.exceptions.FicheroTareaNoEncontradoException;
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
    
    public Ausencia getAusenciaPorId(Long idAusencia) {
    	Optional<Ausencia> ausencia = repository.findById(idAusencia);
    	if (ausencia.isEmpty()) {
    		throw new AusenciaNoEncontradaException(idAusencia);
    	}
    	return ausencia.get();
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
   
       
    public List<Ausencia> getAusenciasPorFechaOrdenadasPorHora(LocalDate fecha) {
    	List<Ausencia> ausencias = repository.findByFechaOrdenPorHora(fecha);
        if (ausencias.isEmpty()) {
            throw new AusenciasNoEncontradasException();
        }
        return ausencias;
    }
    
    public List<Ausencia> getAusenciasFiltradasOrdenadasPorFechaYHora(LocalDate fechaDesde, LocalDate fechaHasta, String profesorGuardia) {
    	List<Ausencia> ausencias;
    	
    	boolean recibeFechas = (fechaDesde != null && fechaHasta != null);
    	boolean recibeProfesor = (profesorGuardia != null && !profesorGuardia.isEmpty());
    	
    	if (recibeFechas && recibeProfesor) {
    		ausencias = repository.findByFechasYProfesorGuardiaOrdenPorFechaYHora(fechaDesde, fechaHasta, profesorGuardia);
    	} else if (recibeFechas) {
    		ausencias = repository.findByFechasOrdenPorFechaYHora(fechaDesde, fechaHasta);
    	} else {
    		ausencias = repository.findByProfesorGuardiaOrdenPorFechaYHora(profesorGuardia);
    	}
    	if (ausencias.isEmpty()) {
            throw new AusenciasNoEncontradasException();
        }
        return ausencias;
    }
    
    
    public byte[] getFicheroTarea(Long idAusencia) {
    	Optional<Ausencia> ausencia = repository.findById(idAusencia);
    	if (ausencia.isEmpty()) {
    		throw new AusenciaNoEncontradaException(idAusencia);
    	}
    	
        byte[] fichero = ausencia.get().getFichero();
        if (fichero == null || fichero.length == 0) {
            throw new FicheroTareaNoEncontradoException(idAusencia);
        }
        return fichero;
    }
    
    
	public Ausencia crearRegistroAusencia(AusenciaDTO ausenciaDTO) {

		// Valida si existe una ausencia antes de crearla
		boolean existe = existeAusencia(ausenciaDTO.getId().getDniProfesor(), ausenciaDTO.getId().getCursoAcademico(),
				ausenciaDTO.getFechaAusencia(), ausenciaDTO.getNumRegistro());
		if (existe) {
			throw new IllegalArgumentException("Ya existe una ausencia registrada para este día y tramo horario");
		}

		// Crear y rellenar la ausencia
		Ausencia ausencia = new Ausencia();
		ausencia.setFechaAusencia(ausenciaDTO.getFechaAusencia());
		ausencia.setComentario(ausenciaDTO.getComentario());

		Horario horario = horarioRepository.findById(ausenciaDTO.getNumRegistro()).orElseThrow(
				() -> new RuntimeException("No existe el horario con ID: " + ausenciaDTO.getNumRegistro()));

		ausencia.setHorariosProfesor(horario);

		Profesor profesor = profesorRepository.findById(ausenciaDTO.getId())
				.orElseThrow(() -> new RuntimeException("No existe el profesor con ID: " + ausenciaDTO.getId()));

		ausencia.setProfesor(profesor);

		// Guardar en base de datos
		return repository.save(ausencia);

	}

	public boolean existeAusencia(String dniProfesor, String cursoAcademico, LocalDate fecha, Integer numRegistro) {
		return repository
				.existsByProfesorIdDniProfesorAndProfesorIdCursoAcademicoAndFechaAusenciaAndHorariosProfesorNumRegistro(
						dniProfesor, cursoAcademico, fecha, numRegistro);
	}

}
