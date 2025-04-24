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
@Table(name = "ausenciasprofesor")
public class Ausencia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FechaAusencia", nullable = false)
	private LocalDate fechaAusencia;
	
	@Column(name = "Comentario", nullable = false, columnDefinition = "LONGTEXT")
	private String comentario;
	
	@Lob
	@Column(name = "Tarea", nullable = true, columnDefinition = "LONGTEXT")
	private String tarea;
	
	@Lob
	@Column(name = "Fichero", nullable = true, columnDefinition = "BLOB")
	private byte[] fichero;
	
	
	//Se puede indicar la longitud (length) para ser coherentes con la BD (ejemplo VARCHAR(50), etc)
	//Usamos Lombok?? (@Getter, @Setter....)

}
