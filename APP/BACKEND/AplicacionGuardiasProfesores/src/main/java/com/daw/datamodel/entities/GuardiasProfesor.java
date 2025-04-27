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
@Table(name = "guardiasProfesor")
public class GuardiasProfesor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdGuardia")
	private Long idGuardia;
	
	@Column(name = "Grupo", nullable = false, length = 20)
	private String grupo;
	
	@Column(name = "Tramo", nullable = false, length = 1)
	private Integer tramo;
	
	@Column(name = "Duracion", nullable = false, length = 10)
	private Integer duracion;
	
}
