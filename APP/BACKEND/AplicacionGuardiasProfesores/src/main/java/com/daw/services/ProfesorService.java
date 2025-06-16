package com.daw.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Profesor;
import com.daw.datamodel.entities.ProfesorId;
import com.daw.repositories.ProfesorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfesorService {

	private final ProfesorRepository repository;

	public List<Profesor> findAll() {
		return repository.findAll();
	}

//	public Optional<Profesor> findById(ProfesorId id) {
//		return repository.findById(id);
//	}
//
//	public Profesor save(Profesor profesor) {
//		return repository.save(profesor);
//	}
//
//	public void deleteById(ProfesorId id) {
//		repository.deleteById(id);
//	}
}
