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
@Table(name = "guardia")
public class Guardia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idGuardia")
	private Long idGuardia;
	
	@Column(name = "grupo", nullable = false)
	private String grupo;
	
	@Column(name = "duracion", nullable = false)
	private String duracion;

}
