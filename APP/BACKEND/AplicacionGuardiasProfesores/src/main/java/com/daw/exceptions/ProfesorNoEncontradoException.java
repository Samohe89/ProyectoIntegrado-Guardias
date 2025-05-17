package com.daw.exceptions;

public class ProfesorNoEncontradoException extends RuntimeException{

	private static final long serialVersionUID = -5560204210575864802L;
	
		public ProfesorNoEncontradoException(String dniProfesor) {
			super("Profesor con DNI: " + dniProfesor + " no encontrado");
		}

}
