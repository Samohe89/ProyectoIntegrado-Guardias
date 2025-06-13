package com.daw.dto;

import com.daw.datamodel.entities.ProfesorId;

import lombok.Data;

@Data
public class GuardiaTotalHorasDTO {
	
	private Long idGuardia;
	
	private Integer duracion;
	
	private ProfesorId id;
	
	

}
