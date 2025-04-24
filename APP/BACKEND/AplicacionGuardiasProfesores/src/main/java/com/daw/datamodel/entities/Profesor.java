package com.daw.datamodel.entities;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name= "profesor")
public class Profesor {
	
	@Id
	@Column(name= "DNIProfesor", nullable = false)
	private String dniProfesor;
	
	//Investigar PK compuestas en Spring
	@Column(name = "CursoAcademico", nullable = false)
	private String cursoAcademico;
	
	@Column(name = "NombreProfesor", nullable = false)
	private String nombre;
	
	@Column(name = "Usuario", nullable = false)
	private String usuario;
	
	@Column(name = "ClaveProfesor", nullable = false)
	private String clave;
	
	@Column(name = "Alias", unique = false)
	private String alias;
	
	@Column(name = "NombreDepartamento", nullable = false)
	private String departamento;
	
	@Column(name = "email", nullable = false)
	private String email;

}


//Se puede indicar la longitud (length) para ser coherentes con la BD (ejemplo VARCHAR(50), etc)
//Usamos Lombok?? (@Getter, @Setter....)