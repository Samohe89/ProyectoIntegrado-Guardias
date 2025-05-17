package com.daw.config;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.daw.errors.ApiError;
import com.daw.exceptions.HorarioNoEncontradoException;
import com.daw.exceptions.ProfesorNoEncontradoException;
import com.daw.exceptions.TramoNoDisponibleException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler({
        ProfesorNoEncontradoException.class,
        HorarioNoEncontradoException.class,
        TramoNoDisponibleException.class,
        IllegalArgumentException.class
    })
    public ResponseEntity<ApiError> handleBadRequest(RuntimeException ex, HttpServletRequest request) {
        ApiError error = new ApiError();
        error.setEstado("BAD_REQUEST");
        error.setFecha(LocalDateTime.now());
        error.setMensaje(ex.getMessage());
        error.setPath(request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneralError(Exception ex, HttpServletRequest request) {
        ApiError error = new ApiError();
        error.setEstado("INTERNAL_SERVER_ERROR");
        error.setFecha(LocalDateTime.now());
        error.setMensaje("Error interno: " + ex.getMessage());
        error.setPath(request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}


