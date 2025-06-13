package com.daw.dto;

import com.daw.datamodel.entities.ProfesorId;

import lombok.Data;

@Data
public class ProfesorTotalHorasGuardiaDTO {
	
	private ProfesorId id;
	
	private String nombreProfesor;
	
	private double totalHoras;
	
	public ProfesorTotalHorasGuardiaDTO(ProfesorId id, String nombreProfesor, double totalHoras) {
        this.id = id;
        this.nombreProfesor = nombreProfesor;
        this.totalHoras = totalHoras;
    }

}
