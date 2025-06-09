package com.daw.exceptions;

public class AusenciaNoEncontradaException extends RuntimeException {

	private static final long serialVersionUID = -8815331611288948679L;
	
	public AusenciaNoEncontradaException(Long id) {
        super("No existe la ausencia con id: " + id);
    }

}
