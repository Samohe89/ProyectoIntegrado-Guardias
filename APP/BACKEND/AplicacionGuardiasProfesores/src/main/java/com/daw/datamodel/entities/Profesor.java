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
	
	@Column(name = "cursoAcademico", nullable = false)
	private Integer cursoAcademico;
	
	@Column(name = "nombre", nullable = false)
	private String nombre;
	
	@Column(name = "usuario", nullable = false)
	private String usuario;
	
	@Column(name = "clave", nullable = false)
	private String clave;
	
	@Column(name = "alias", unique = true)
	private String alias;
	
	@Column(name = "departamento", nullable = true)
	private String departamento;
	
	@Column(name = "email", nullable = true)
	private String email;

}
