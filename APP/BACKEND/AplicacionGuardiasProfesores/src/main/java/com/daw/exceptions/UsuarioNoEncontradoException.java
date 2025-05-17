package com.daw.exceptions;

public class UsuarioNoEncontradoException extends RuntimeException {

	private static final long serialVersionUID = -7641166094287431038L;

		public UsuarioNoEncontradoException(String username) {
	        super("Usuario " + "'" + username + "' no encontrado");
	    }
	}

