package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.DniProfesorCursoAcademicoId;
import com.daw.datamodel.entities.Profesor;
import com.daw.repositories.ProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfesorService {

	private final ProfesorRepository repository;

	public List<Profesor> findAll() {
		return repository.findAll();
	}

	public Optional<Profesor> findById(DniProfesorCursoAcademicoId id) {
		return repository.findById(id);
	}

	public Profesor save(Profesor profesor) {
		return repository.save(profesor);
	}

	public void deleteById(DniProfesorCursoAcademicoId id) {
		repository.deleteById(id);
	}
}
