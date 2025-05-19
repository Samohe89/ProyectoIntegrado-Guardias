package com.daw.exceptions;

import java.time.LocalDate;

public class AusenciasNoEncontradasException extends RuntimeException {

	private static final long serialVersionUID = -8599290542844183786L;

	public AusenciasNoEncontradasException (LocalDate fecha) {
        super("No existen ausencias registradas para el día: " + fecha);
    }
}

