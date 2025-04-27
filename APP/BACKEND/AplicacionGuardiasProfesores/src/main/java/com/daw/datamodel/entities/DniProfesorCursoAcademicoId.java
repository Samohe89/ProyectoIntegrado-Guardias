package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class DniProfesorCursoAcademicoId {
	
	@Column(name= "DNIProfesor", nullable = false, length = 10)
	private String dniProfesor;
	
	@Column(name = "CursoAcademico", nullable = false, length = 7)
	private String cursoAcademico;

}
