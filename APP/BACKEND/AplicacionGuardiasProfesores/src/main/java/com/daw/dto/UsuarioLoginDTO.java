package com.daw.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UsuarioLoginDTO {

	@NotEmpty
	private String username;

	@NotEmpty
	private String password;

	@NotEmpty
	private String rol;

	@NotEmpty
	private String cursoAcademico;
}
