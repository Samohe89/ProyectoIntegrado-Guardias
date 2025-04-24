package com.daw.datamodel.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "roles")
public class Rol {

	@Id
	@Column(name = "Rol", nullable = false)
	private String rol;
}


//Se puede indicar la longitud (length) para ser coherentes con la BD (ejemplo VARCHAR(50), etc)
//Usamos Lombok?? (@Getter, @Setter....)