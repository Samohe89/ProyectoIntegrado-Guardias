package com.daw.controllers;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.dto.UsuarioAutenticadoDTO;
import com.daw.dto.UsuarioLoginDTO;
import com.daw.errors.ApiError;
import com.daw.exceptions.PasswordInvalidaException;
import com.daw.exceptions.RolNoAsignadoException;
import com.daw.exceptions.UsuarioNoEncontradoException;
import com.daw.services.LoginService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:4200")	// URL del Frontend
public class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping
	public ResponseEntity<UsuarioAutenticadoDTO> login(@RequestBody UsuarioLoginDTO usuarioLogin) {
		UsuarioAutenticadoDTO usuarioAutenticado = loginService.autenticarUsuario(usuarioLogin);
		return ResponseEntity.ok(usuarioAutenticado);
	}
	
	

	// MANEJO DE EXCEPCIONES

	@ExceptionHandler(UsuarioNoEncontradoException.class)
	public ResponseEntity<ApiError> handleUsuarioNoEncontrado(UsuarioNoEncontradoException ex, HttpServletRequest req) {
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.NOT_FOUND.toString());
		apiError.setFecha(LocalDateTime.now());
		apiError.setMensaje(ex.getMessage());
		apiError.setPath(req.getServletPath());
		return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(PasswordInvalidaException.class)
	public ResponseEntity<ApiError> handlePasswordInvalida(PasswordInvalidaException ex, HttpServletRequest req) {
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.UNAUTHORIZED.toString());
		apiError.setFecha(LocalDateTime.now());
		apiError.setMensaje(ex.getMessage());
		apiError.setPath(req.getServletPath());
		return new ResponseEntity<>(apiError, HttpStatus.UNAUTHORIZED);
	}

	@ExceptionHandler(RolNoAsignadoException.class)
	public ResponseEntity<ApiError> handleRolNoAsignado(RolNoAsignadoException ex, HttpServletRequest req) {
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.FORBIDDEN.toString());
		apiError.setFecha(LocalDateTime.now());
		apiError.setMensaje(ex.getMessage());
		apiError.setPath(req.getServletPath());
		return new ResponseEntity<>(apiError, HttpStatus.FORBIDDEN);
	}

}