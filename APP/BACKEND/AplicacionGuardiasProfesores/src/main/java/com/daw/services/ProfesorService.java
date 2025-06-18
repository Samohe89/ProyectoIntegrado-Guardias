package com.daw.services;

import java.util.List;


import org.springframework.stereotype.Service;

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

}
