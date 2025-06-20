package com.daw.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Profesor;
import com.daw.datamodel.entities.ProfesorRol;
import com.daw.dto.UsuarioAutenticadoDTO;
import com.daw.dto.UsuarioLoginDTO;
import com.daw.exceptions.PasswordInvalidaException;
import com.daw.exceptions.RolNoAsignadoException;
import com.daw.exceptions.UsuarioNoEncontradoException;
import com.daw.repositories.ProfesorRepository;
import com.daw.repositories.ProfesorRolRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

	private final ProfesorRepository profesorRepository;

	@Autowired
	private final ProfesorRolRepository profesorRolRepository;

	public UsuarioAutenticadoDTO autenticarUsuario(UsuarioLoginDTO usuarioLogin) {
		// Buscar el profesor por "usuario"
		Profesor profesor = profesorRepository.findByUsuario(usuarioLogin.getUsername());
		if (profesor == null) {
			throw new UsuarioNoEncontradoException(usuarioLogin.getUsername());
		}

		// Comprobar contraseña
		if (!profesor.getClaveProfesor().equals(usuarioLogin.getPassword())) {
			throw new PasswordInvalidaException();
		}

		// Verificar el rol del profesor
		ProfesorRol profesorRol = profesorRolRepository.findByProfesorIdDniProfesorAndIdCursoAcademicoAndIdRol(
				profesor.getId().getDniProfesor(), profesor.getId().getCursoAcademico(), usuarioLogin.getRol());

		if (profesorRol == null) {
			throw new RolNoAsignadoException(usuarioLogin.getRol());
		}

		// Respuesta si todo está OK
		UsuarioAutenticadoDTO usuarioAutenticado = new UsuarioAutenticadoDTO();
		usuarioAutenticado.setDniProfesor(profesor.getId().getDniProfesor());
        usuarioAutenticado.setCursoAcademico(profesor.getId().getCursoAcademico());
        usuarioAutenticado.setNombreProfesor(profesor.getNombreProfesor());
        usuarioAutenticado.setAlias(profesor.getAlias());
        usuarioAutenticado.setRol(usuarioLogin.getRol());
		return usuarioAutenticado;
	}
	
}
