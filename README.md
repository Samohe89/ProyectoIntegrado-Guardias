# 📘 Aplicación de Guardias y Ausencias de Profesores

## 🎓 Proyecto Integrado - Grado Superior en Desarrollo de Aplicaciones Web (DAW)

Este proyecto forma parte del módulo de Proyecto Integrado del ciclo formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW). El objetivo es desarrollar una aplicación web para la **gestión de guardias y ausencias del profesorado** en un centro educativo, partiendo de una aplicación ya existente que hemos mejorado y ampliado con nuevas funcionalidades.

## 👥 Equipo de Desarrollo

El desarrollo ha sido llevado a cabo por un equipo de **tres compañeros**, trabajando de forma colaborativa para cubrir todas las fases del ciclo de vida del software: análisis, diseño, desarrollo, pruebas y documentación.
- **Manuel León Fernández**
- **Sandra Moriana Herrera**
- **Maria del Carmen Ruiz Sánchez**

## ⚙️ Tecnologías Utilizadas

- **Frontend:** Angular, HTML5, CSS3, Bootstrap5
- **Backend:** Spring Boot (Java)
- **Base de Datos:** MySQL
- **IDEs:** Visual Studio Code, Spring Tool Suite 4
- **Control de versiones:** Git, GitHub
- **Despliegue:** Docker
- **Diseño de Interfaces:** Figma

## 🚀 Objetivos del Proyecto

- Mejorar la estructura y usabilidad de una aplicación existente.
- Añadir nuevas funcionalidades orientadas a facilitar la gestión de ausencias y guardias de los profesores.
- Aplicar buenas prácticas de desarrollo web y gestión de proyectos.
- Desplegar la aplicación de forma virtualizada con contenedores Docker.

## 🆕 Funcionalidades Añadidas

- Formulario de registro de ausencias
- Consulta de listado de ausencias (propias en perfil Profesor/a y de todos los profesores en perfil Directivo/a)
- Actualización y/o eliminación de ausencias
- Añadir, editar y/o eliminar tareas
- Asignación de guardias
- Consulta de listado de guardias (día actual y siguiente para perfil Profesor/a y completo para el perfil Directivo/a)
- Consulta del total de horas de guarida por profesor
- Imprimir listados

## 🖼️ Diseño de Interfaz

Se ha realizado un rediseño completo de la interfaz de usuario teniendo en cuenta principios de usabilidad y accesibilidad. Las pantallas están adaptadas según el perfil del usuario: profesor o directivo.

## 🐳 Despliegue con Docker

El proyecto está preparado para su despliegue mediante **Docker**. Se han creado contenedores separados para el backend (Spring Boot) y la base de datos (MySQL), junto con un `docker-compose.yml` que facilita la puesta en marcha del entorno completo.

## 📂 Estructura del Repositorio

- `APP/BACKEND`  
  Proyecto desarrollado con Spring Boot (Java)

- `APP/FRONTEND`  
  Aplicación Angular para la interfaz de usuario

- `APP/BD`  
  Archivos de configuración de la base de datos en MySQL
  
- `DOC`  
  Documentos del proyecto:
  - bd_base
  - Enunciado
  - Esquemas_diagramas
  - Interfaz
  - Enlace GoogleDocs
 
## 📜 Instrucciones de Despliegue
- Descarga e instala Docker desktop en tu equipo
- Clona el repositorio en tu ordenador: git clone https://github.com/Samohe89/ProyectoIntegrado-Guardias.git
- Asegurate de que tu equipo tiene liberados los puertos 3306, 4200 y 8080.
- Accede a la carpeta raiz del proyecto \ProyectoIntegrado-Guardias
- Abre la terminal en dicha carpeta y ejecuta el comando `docker-compose up --build`
- Espera mientras se crean las imágenes y contenedores de Docker que desplegarán la aplicación.
- Accede al navegador y navega a la ruta `http://localhost:4200`
