package com.daw.exceptions;

public class HorarioNoEncontradoException extends RuntimeException{

	private static final long serialVersionUID = 8925580381730465695L;
	
		public HorarioNoEncontradoException(Integer numRegistro) {
			super("No se encontró el horario con ID: " + numRegistro);
		}

}
