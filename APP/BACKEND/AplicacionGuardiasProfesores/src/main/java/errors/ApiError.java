package errors;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
public class ApiError {
	
	private String estado;
	
	@JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss")
	private LocalDateTime fecha;
	
	private String mensaje;
	
	private String path;

}
