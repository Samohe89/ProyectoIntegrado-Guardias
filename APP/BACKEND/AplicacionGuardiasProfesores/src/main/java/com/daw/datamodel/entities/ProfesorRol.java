package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "profesorRol")
public class ProfesorRol {
	
	@Id
	@Column(name= "dniProfesor", nullable= false)
	private String dniProfesor;
	
	@Column(name = "cursoAcademico", nullable = false)
	private Integer cursoAcademico;
	
	@Column(name = "rol", nullable = false)
	private String rol;
	
	@Column(name = "grupoTutoria", nullable = true)
	private String grupoTutoria;
	
	

}
