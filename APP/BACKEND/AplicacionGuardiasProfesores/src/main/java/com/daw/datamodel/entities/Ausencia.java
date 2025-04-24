package com.daw.datamodel.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "ausencia")
public class Ausencia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "fechaAusencia", nullable = false)
	private LocalDate fechaAusencia;
	
	@Column(name = "comentario", nullable = true)
	private String comentario;
	
	@Lob
	@Column(name = "tarea", nullable = true, columnDefinition = "LONGTEXT")
	private String tarea;
	
	@Lob
	@Column(name = "fichero", nullable = true, columnDefinition = "BLOB")
	private byte[] fichero;
	
	
	

}
