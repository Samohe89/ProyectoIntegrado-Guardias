package com.daw.exceptions;


public class FicheroTareaNoEncontradoException extends RuntimeException {


	private static final long serialVersionUID = -3287671571244013013L;
	
	public FicheroTareaNoEncontradoException(Long id) {
		super("No existe fichero adjunto como tarea en la ausencia: " + id);
	}

}
