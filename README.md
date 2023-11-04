# API de Monitoreo de IoT

La API de Monitoreo de IoT proporciona acceso a datos en tiempo real de dispositivos IoT, lo que permite el monitoreo y la gestión de dispositivos conectados. Esta aplicación está construida con NestJS y utiliza una base de datos para almacenar información de eventos de IoT.

## Descripción

Esta API permite la simulación de la creación de eventos de monitoreo de IoT y proporciona una interfaz para obtener estos eventos. Puedes utilizar esta API para integrarla con tus dispositivos IoT y recopilar datos importantes para su monitoreo y gestión.

## Instalación

Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema antes de comenzar.

1. Clona o descarga este repositorio en tu máquina local.

2. Instala las dependencias utilizando el siguiente comando:

   ```bash
   npm install
   ```

## Configuración

Antes de ejecutar la aplicación, debes configurar la conexión a la base de datos. Abre el archivo `.env` en la raíz del proyecto y proporciona los detalles de tu base de datos, como la URL, el nombre de usuario y la contraseña.

```env
DB_SERVER=your_database_host
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=your_database_name
PORT=your_database_port
```

## Uso

### Iniciar la aplicación en modo de desarrollo

Puedes iniciar la aplicación en modo de desarrollo con el siguiente comando:

```bash
npm run start:dev
```

Esto ejecutará la aplicación y permitirá el monitoreo de eventos de IoT a través de la API.

## Controlador de Eventos de IoT

El controlador de eventos de IoT proporciona acceso a datos en tiempo real de dispositivos IoT y permite gestionar eventos relacionados con el monitoreo de IoT.

### Generación de Eventos

La aplicación puede generar eventos de monitoreo de forma periódica. Para configurar la generación de eventos, puedes ajustar el método `generateEvent()` en el controlador. Esta funcionalidad se utiliza principalmente para pruebas y simulaciones y no está disponible públicamente.

### Obtener Eventos

Puedes obtener eventos de monitoreo a través de la API utilizando solicitudes HTTP GET. A continuación, se muestran los endpoints disponibles:

- `GET /event`: Obtiene todos los eventos de monitoreo paginados.
- `GET /event/getTotalRecords`: Obtiene el número total de eventos de monitoreo.
- `POST /event/search`: Permite buscar eventos de monitoreo utilizando un objeto `SearchDto`.
- `POST /event/searchTotalRecords`: Obtiene el número total de eventos que coinciden con los criterios de búsqueda.
- `GET /event/:id`: Obtiene un evento de monitoreo específico por su EventId.

### Documentación de la API

La API está documentada utilizando Swagger para una fácil comprensión y prueba de los endpoints. Puedes consultar la documentación de la API en la ruta base de la aplicación.

### Controladores y DTOs

El controlador utiliza los siguientes DTOs:

- `CreateEventDto`: Se utiliza para crear nuevos eventos.
- `UpdateEventDto`: Se utiliza para actualizar eventos existentes.
- `FindAllEventDto`: Se utiliza para mostrar detalles de eventos en la API.

### Uso de Cabeceras

La API permite el uso de cabeceras para personalizar las respuestas. Puedes utilizar las siguientes cabeceras en las solicitudes:

- `Limit`: Limita la cantidad de registros devueltos en la respuesta (ejemplo: 10).
- `Offset`: Establece el punto de inicio para la paginación (ejemplo: 0).
- `Order`: Define el campo por el cual ordenar los resultados (ejemplo: "SensorID").
- `Direction`: Establece la dirección de ordenamiento, ASC (1) o DESC (-1) (ejemplo: -1).

## Autor

- [Jonatan Sandoval](https://github.com/Jonatan-ESG)

¡Gracias por usar la API de Monitoreo de IoT construida con NestJS! Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarme.
