package com.daw.datamodel.entities;



import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name= "profesor")
public class Profesor {
	
	@EmbeddedId
	private ProfesorId id;
	
	@Column(name = "NombreProfesor", nullable = false, length = 100)
	private String nombreProfesor;
	
	@Column(name = "Usuario", nullable = false, length = 15)
	private String usuario;
	
	@Column(name = "ClaveProfesor", nullable = false, length = 25)
	private String claveProfesor;
	
	@Column(name = "Alias", unique = true, length = 5)
	private String alias;
	
	@Column(name = "NombreDepartamento", nullable = false, length = 50)
	private String nombreDepartamento;
	
	@Column(name = "email", nullable = false, length = 100)
	private String email;
	
	@OneToMany(mappedBy = "profesor")
	@JsonIgnore
	private Set<Guardia> guardiasProfesores;
	
	@OneToMany(mappedBy = "profesor")
	@JsonIgnore
	private Set<Ausencia> ausenciasProfesores;
	
	@OneToMany(mappedBy = "profesor")
	@JsonIgnore
	private Set<Horario> horariosProfesores;

	@OneToMany(mappedBy = "profesor")
	@JsonIgnore
	private Set<ProfesorRol> profesorRoles;
}

