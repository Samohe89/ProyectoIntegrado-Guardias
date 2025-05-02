package com.daw.datamodel.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class Roles {

	@Id
	@Column(name = "Rol", nullable = false, length = 50)
	private String rol;
	
	@OneToMany(mappedBy = "roles")
	@JsonIgnore
	private Set<ProfesorRoles> profesorRoles;
}

