package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "horariosProfesor")
public class HorariosProfesor {
	
	@Id
	@Column(name= "NumRegistro", length = 11)
	private Integer numRegistro;
	
	@Column(name = "Grupo", nullable = false, length = 20)
	private String grupo;
	
	@Column(name = "Profesor", nullable = false, length = 20)
	private String aliasProfesor;
	
	@Column(name = "Asignatura", nullable = false, length = 50)
	private String asignatura;
	
	@Column(name= "Aula", nullable = false, length = 20)
	private String aula;
	
	@Column(name = "Dia", nullable = false, length = 11)
	private Integer dia;
	
	@Column(name = "Hora", nullable = false, length = 11)
	private Integer hora;

}

