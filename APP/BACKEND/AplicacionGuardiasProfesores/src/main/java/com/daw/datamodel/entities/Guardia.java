package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "guardiasprofesor")
public class Guardia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IdGuardia")
	private Long idGuardia;
	
	@Column(name = "Grupo", nullable = false, length = 20)
	private String grupo;
	
	@Column(name = "Tramo", nullable = false, length = 1)
	private Integer tramo;
	
	@Column(name = "Duracion", nullable = false, length = 10)
	private Integer duracion;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumns({
		@JoinColumn(name = "ProfesorGuardia", referencedColumnName = "dniProfesor", nullable = false,
				foreignKey = @ForeignKey(name="ProfesorGuardia")),
		@JoinColumn(name = "CursoAcademico", referencedColumnName = "cursoAcademico", nullable = false,
				foreignKey = @ForeignKey(name="CursoAcademico"))
	})
	private Profesor profesor;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "IdAusencia", referencedColumnName = "id", nullable = false,
	foreignKey = @ForeignKey(name="FK_IdAusencia"))
	private Ausencia ausencia;
	
}
