package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "horario")
public class Horario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "numRegistro")
	private Long numRegistro;
	
	@Column(name = "grupo", nullable = false)
	private String grupo;
	
	@Column(name = "asignatura", nullable = false)
	private String asignatura;
	
	@Column(name= "aula", nullable = true)
	private String aula;
	
	@Column(name = "dia", nullable = false)
	private Integer dia;
	
	@Column(name = "hora", nullable = false)
	private Integer hora;

}
