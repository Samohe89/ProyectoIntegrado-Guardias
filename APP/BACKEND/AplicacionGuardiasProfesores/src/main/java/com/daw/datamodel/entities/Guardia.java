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
@Table(name = "guardiasprofesor")
public class Guardia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdGuardia")
	private Long id;
	
	@Column(name = "Grupo", nullable = false)
	private String grupo;
	
	@Column(name = "Tramo", nullable = false)
	private Integer tramo;
	
	@Column(name = "Duracion", nullable = false)
	private Integer duracion;
	
	
	//Se puede indicar la longitud (length) para ser coherentes con la BD (ejemplo VARCHAR(50), etc)
	//Usamos Lombok?? (@Getter, @Setter....)

}
