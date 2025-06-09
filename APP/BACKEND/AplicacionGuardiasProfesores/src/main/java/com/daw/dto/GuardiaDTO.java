package com.daw.dto;


import com.daw.datamodel.entities.ProfesorId;

import lombok.Data;

@Data
public class GuardiaDTO {
		
		private String grupo;
				
		private Integer tramo;
		
		private ProfesorId idProfesorGuardia;
					
		private Long idAusencia;
	

}
