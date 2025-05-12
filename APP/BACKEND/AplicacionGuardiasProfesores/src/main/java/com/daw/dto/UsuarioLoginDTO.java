package com.daw.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UsuarioLoginDTO {

	@NotNull
	private String username;

	@NotNull
	private String password;

	@NotNull
	private String rol;

	@NotNull
	private String cursoAcademico;
}
