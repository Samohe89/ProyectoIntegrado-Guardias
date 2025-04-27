package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class Roles {

	@Id
	@Column(name = "Rol", nullable = false, length = 50)
	private String rol;
}

