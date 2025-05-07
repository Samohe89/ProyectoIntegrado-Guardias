package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "profesorroles")
public class ProfesorRol {
	
	@EmbeddedId
	private ProfesorRolId id;
	
	@Column(name = "GrupoTutoria", nullable = false, length = 20)
	private String grupoTutoria;
	

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumns({
		@JoinColumn(name = "DNIProfesor", referencedColumnName= "dniProfesor", insertable = false, updatable = false),
		@JoinColumn(name = "CursoAcademico", referencedColumnName = "cursoAcademico", insertable = false, updatable = false)
	})
	private Profesor profesor;
	
	

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "Rol", referencedColumnName = "Rol", insertable = false, updatable = false)
	private Rol roles;

}


