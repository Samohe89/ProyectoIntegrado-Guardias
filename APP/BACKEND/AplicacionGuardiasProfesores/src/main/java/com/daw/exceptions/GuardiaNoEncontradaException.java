package com.daw.exceptions;

public class GuardiaNoEncontradaException extends RuntimeException {

	private static final long serialVersionUID = 9032158318062788955L;

	
	public GuardiaNoEncontradaException(Long id) {
        super("No existe la guardia con id: " + id);
    }

}
