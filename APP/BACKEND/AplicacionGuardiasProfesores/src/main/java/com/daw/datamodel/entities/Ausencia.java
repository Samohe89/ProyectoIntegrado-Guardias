package com.daw.datamodel.entities;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "ausenciasprofesor")
public class Ausencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FechaAusencia", nullable = false)
	private LocalDate fechaAusencia;

	@Column(name = "Comentario", nullable = false, columnDefinition = "LONGTEXT")
	private String comentario;

	@Lob
	@Column(name = "Tarea", nullable = true, columnDefinition = "LONGTEXT")
	private String tarea;

	@Lob
	@Column(name = "Fichero", nullable = true, columnDefinition = "MEDIUMBLOB")
	@JsonIgnore
	private byte[] fichero;

	@OneToMany(mappedBy = "ausenciasProfesor")
	@JsonIgnore
	private Set<Guardia> guardiasProfesores;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
		@JoinColumns({ @JoinColumn(name = "ProfesorAusente", referencedColumnName = "dniProfesor", nullable = false,
		foreignKey = @ForeignKey(name="FK_ProfesorAusente")),
		@JoinColumn(name = "CursoAcademico", referencedColumnName = "cursoAcademico", nullable = false,
		foreignKey = @ForeignKey(name="FK_CursoAcademico")) 
	})
	private Profesor profesor;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "numRegistro", referencedColumnName = "numRegistro", nullable = false,
	foreignKey = @ForeignKey(name="FK_NumRegistro"))
	private Horario horariosProfesor;

}
