package com.daw.dto;

import java.time.LocalDate;

import com.daw.datamodel.entities.ProfesorId;

import lombok.Data;

@Data
public class AusenciaDTO {
	
	private LocalDate fechaAusencia;
	
	private String comentario;
	
	private ProfesorId id;
	
	private Integer numRegistro;

}
