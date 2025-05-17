package exceptions;

public class RolNoAsignadoException extends RuntimeException {

	private static final long serialVersionUID = -4772525384123016197L;

		public RolNoAsignadoException(String rol) {
	        super("El usuario no tiene asignado el rol " + rol);
	    }
	}