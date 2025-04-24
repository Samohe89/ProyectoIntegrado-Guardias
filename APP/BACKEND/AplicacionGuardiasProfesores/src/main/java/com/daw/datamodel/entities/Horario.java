package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "horariosprofesor")
public class Horario {
	
	@Id
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
	//Lo anterior no hace falta, la BD actual no autogenera esto, segun el SQL que nos mandó Ramón. Además, nosotros no creamos horarios, nos da igual como se genere.
	@Column(name= "NumRegistro")
	private Integer numRegistro;
	
	@Column(name = "Grupo", nullable = false)
	private String grupo;
	
	@Column(name = "Profesor", nullable = false)
	private String aliasProfesor;
	
	@Column(name = "Asignatura", nullable = false)
	private String asignatura;
	
	@Column(name= "Aula", nullable = false)
	private String aula;
	
	@Column(name = "Dia", nullable = false)
	private Integer dia;
	
	@Column(name = "Hora", nullable = false)
	private Integer hora;

}


//Se puede indicar la longitud (length) para ser coherentes con la BD (ejemplo VARCHAR(50), etc)
//Usamos Lombok?? (@Getter, @Setter....)