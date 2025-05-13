package exceptions;

public class PasswordInvalidaException extends RuntimeException {

	private static final long serialVersionUID = 7078440898391516867L;

	public PasswordInvalidaException () {
        super("La contraseña es incorrecta");
    }

}
