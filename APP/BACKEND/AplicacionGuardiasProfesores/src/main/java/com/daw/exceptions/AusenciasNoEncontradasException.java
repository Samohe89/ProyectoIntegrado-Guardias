package com.daw.exceptions;


public class AusenciasNoEncontradasException extends RuntimeException {

	private static final long serialVersionUID = -8599290542844183786L;

	public AusenciasNoEncontradasException () {
        super("No existen ausencias registradas para esta fecha o intervalo.");
    }
}

