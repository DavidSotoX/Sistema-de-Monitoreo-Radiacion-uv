# Sistema de Monitoreo SolarUV ⛱️🥇

¡Bienvenido a Sistema de Monitoreo SolarUV! Este proyecto integral te permite supervisar la radiación ultravioleta (UV) en tiempo real utilizando un conjunto de tecnologías innovadoras.

### Descripción general

Este proyecto tiene como objetivo el desarrollo de un sistema completo para monitorear la radiación ultravioleta (UV). A través de un hardware basado en Arduino, una plataforma web y una aplicación móvil, ofrecemos una solución integral para medir y visualizar los niveles de UV en tiempo real.

### Arquitectura del Sistema

Hardware:
  -  ESP32 WROOM: Microcontrolador principal encargado de la adquisición de datos del sensor UV y GPS.
  -  Sensor UV GUVA-S12-SD: Mide la intensidad de la radiación UV.
  -  GPS NEO 6M: Determina la ubicación geográfica del dispositivo.
    
Backend:
  -  Docker: Plataforma de contenedores para el despliegue y gestión de servicios.
  -  Django: Framework web de Python para el desarrollo del backend.
  -  ChatGPT 3.5 turbo: Modelo de lenguaje para la generación de texto y respuestas a consultas.
  -  Microsoft Azure: Plataforma en la nube para el despliegue de la aplicación (App Service, Container Registry).
  -  Node.js: Entorno de ejecución de JavaScript para el desarrollo del backend.
  -  Sequelize.js: ORM para interactuar con la base de datos.
  -  JWT: Mecanismo de autenticación para proteger las rutas de la API.
  -  Python: Lenguaje de programación principal del backend.
    
Frontend:
  -  React: Biblioteca JavaScript para construir interfaces de usuario.
  -  Node.js: Entorno de ejecución para el desarrollo del frontend.
  -  Bootstrap: Framework CSS para el diseño responsivo.
    
Móvil:
  -  React Native: Framework para el desarrollo de aplicaciones móviles multiplataforma.
    
Base de datos:
  -  MySQL: Sistema de gestión de bases de datos relacionales para almacenar los datos recopilados.

##Funcionalidades
Funcionalidades
    - Recopilación de datos: El ESP32 recoge datos del sensor UV y GPS a intervalos regulares.
    - Almacenamiento de datos: Los datos son almacenados en la base de datos MySQL.
    - API REST: Django expone una API REST para acceder y manipular los datos almacenados.
    - Interfaz web: Una aplicación web React permite visualizar los datos de forma gráfica y realizar consultas.
    - Aplicación móvil: Una aplicación móvil React Native permite acceder a los datos en tiempo real y recibir notificaciones.
    - Integración con ChatGPT: Para responder preguntas personalizadas sobre la rediación uv a los usuarios con los datos generados de la aplicación.


## Instalación y configuración
  - [X] Requisitos previos: Instalar Git, Node.js, Docker y las dependencias específicas de cada tecnología. (consulta el archivo package.json para más detalles)
  - [X] Clonar el repositorio:
    -  Abre una terminal o símbolo del sistema
    -  Navega hasta el directorio donde deseas clonar el repositorio
    -  Ejecuta el siguiente comando para clonar el repositorio:

  ```
      git clone https://github.com/DavidSotoX/Sistema-de-Monitoreo-Radiacion-uv.git*\ 
  ```
  - [X] Configuración del entorno: 
  ```
    npm install  # usando npm
    yarn install  # usando yarn

  ```
  - [X] Para iniciar el server :
  ```
    npm start

  ```
### Contribución
 ¡Las contribuciones son bienvenidas! Para contribuir a este proyecto:
        Forkea el repositorio.
        Crea una nueva rama para tus cambios.
        Realiza tus cambios y haz commit.
        Envía una solicitud de pull request.
### Créditos 🧑‍🤝‍🧑 @jandry @Javier @Joffre
