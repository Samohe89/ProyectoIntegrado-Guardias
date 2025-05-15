package com.daw.datamodel.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "horariosprofesor")
public class Horario {
	
	@Id
	@Column(name= "NumRegistro", length = 11)
	private Integer numRegistro;
	
	@Column(name = "Grupo", nullable = false, length = 20)
	private String grupo;
	
	@Column(name = "Profesor", nullable = false, length = 20)
	private String aliasProfesor;
	
	@Column(name = "Asignatura", nullable = false, length = 50)
	private String asignatura;
	
	@Column(name= "Aula", nullable = false, length = 20)
	private String aula;
	
	@Column(name = "Dia", nullable = false, length = 11)
	private Integer dia;
	
	@Column(name = "Hora", nullable = false, length = 11)
	private Integer hora;
	
	@OneToMany(mappedBy = "horariosProfesor")
	@JsonIgnore
	private Set<Ausencia> ausenciasProfesores;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumns({
		@JoinColumn(name = "DNIProfesor", referencedColumnName = "dniProfesor", nullable = false,
				foreignKey = @ForeignKey(name="FK_DNIProfesor")),
		@JoinColumn(name = "Curso", referencedColumnName = "cursoAcademico", nullable = false,
				foreignKey = @ForeignKey(name="FK_CursoAcademico"))
	})
	private Profesor profesor;
}

