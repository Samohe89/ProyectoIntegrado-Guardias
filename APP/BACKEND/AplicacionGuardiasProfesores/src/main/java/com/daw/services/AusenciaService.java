package com.daw.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Ausencia;
import com.daw.datamodel.entities.Horario;
import com.daw.datamodel.entities.Profesor;
import com.daw.dto.AusenciaDTO;
import com.daw.repositories.AusenciaRepository;
import com.daw.repositories.HorarioRepository;
import com.daw.repositories.ProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
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
