## Decripcion

Aplicación capaz de registrar usuarios y crear tareas para esos usuarios. Cada tarea tiene una fecha de inicio, una fecha límite para
completar la tarea y una fecha de conclucion, esta cuando se completa la tarea. Dependiendo de la fecha de conclucion se registra un status diferente.

## Funciones y datos del proyecto

/api/v1/users

- POST "/" Crear usuario (enviar name, email, y password por req.body)
- GET "/" Obtener a todos los usuarios activos
- PATCH "/:id" Actualizar perfil de usuario (solo name y email)
- DELETE "/:id" Deshabilitar cuenta de usuario

/api/v1/tasks

- POST "/" Crear tarea (enviar title, userId, y limitDate por req.body)
- GET "/" Obtener a todas las tareas registradas
- GET "/:status" Obtener las tareas de acuerdo con el status que nos envíen.
- PATCH "/:id" Actualizar de una tarea de acuerdo con el id.
- DELETE "/:id" Cancelar la tarea (status cancelled)

## Lenguajes y Herramientas

- NodeJs
- Express
- Express-validator
- MongoDB
- Mongoose
- Postman
- Dotenv-.env

## Autor

** Diego Nieves **

- [LinkedIn](https://www.linkedin.com/in/diego-nieves-04b409242/)
- [Portafolio web](https://nvs-dlc.netlify.app)

## Contratación

Si quieres contratarme puedes escribirme a nieves.diego0426@gmail.com 👍.
