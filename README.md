# Despliegue del proyecto

- El proyecto ha sido desarrollado haciendo uso de npm como gestor de paquetes
- Se ha desplegado React + Typescript con Vite
- Se ha desplegado Node + Typescript con TypeORM

Para arrancar el proyecto:

1. React: Dentro de la carpeta `/client`
- Ejecutar el comando `npm install` para instalar las dependencias
- Ejecutar el comando `npm run dev` para iniciar el proyecto

2. Node: Dentro de la carpeta `/server`
- Ejecutar el comando `npm install` para instalar las dependencias
- Ejecutar el comando `npm run start` para iniciar el proyecto
- El servidor se ejecuta en el puerto 3000

3. La configuración de la base de datos de PostrgreSQL se encuentra en `/server/src/data-source.ts`.

```js
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "test",
    database: "sercomgas",
    synchronize: true,
    logging: false,
    entities: [Marketers, Operations],
    migrations: [],
    subscribers: [],
})
```

- El servidor ha sido desplegado en localhost, puerto por defecto 5432, nombre de la base de datos `sercomgas`
- Ajustar las opciones de usuario y contraseña
- El esquema de BBDD se debería generar automaticamente gracias a su definición en las entidades `/server/src/entity`

- Si deseas importar la base de datos, puedes encontra una copia en `/bdd/sercomgas.sql`, para importarla:
1. Crear la base de datos `sercomgas`
2. Click derecho en la base de datos `sercomgas` >> Seleccionar `Restore...`
3. Formato `Custom or Tar` y seleccionar nuestro filename `sercomgas.sql`

- En caso contrario, se generarán datos para la entity `Marketers` de forma automatica y el usuario podra añadir `Operations` mediante la interfaz gráfica.

# Tomas de decisión

## Client

### Arquitectura por funcionalidades
```
src/

Componentes globalmente utilizados en toda la aplicación
|-- components/
|   |-- ui/
|   |   |--- Navbar.tsx

Configuración, en este caso podemos ver la configuración de la ruta para las Http request
|-- config/
|   |-- http-common.ts

Funcionalidades de la aplicación separadas por páginas, el objetivo es encapsular las funcionalidades
|-- features/
|   |-- operations/
|   |   |-- components/
|   |   |   |-- form/
|   |   |   |   |-- Form.tsx
|   |   |   |-- list/
|   |   |   |   |-- List.tsx
|   |   |-- layout/
|   |   |   |-- OperationsLayout.tsx
|   |   |-- OperationsPage.tsx
|   |-- marketers/

Custom hooks
|-- hooks/
|   |-- useForm.ts
|   |-- useRedux.ts

|-- interfaces/
|   |-- MarketersData.ts
|   |-- OperationData.ts
|   |-- DeleteResponse.ts

|-- router/
|   |-- AppRouter.tsx

Servicios que generan la llamada Http mediante Axios
|-- services/
|   |-- marketersService.tsx
|   |-- operationsService.tsx

Store donde aplicamos el patrón de diseño Redux
|-- store/
|   |-- slices/
|   |   |-- marketers/
|   |   |   |-- marketeresSlice.ts
|   |   |-- operations/
|   |   |   |-- operationsSlice.ts
|   |-- store.ts

|-- main.tsx
```

Por preferencia suelo crear archivos de barril `index.ts` para agilizar el proceso de importación/exportación de los diferentes componentes funcionales entre modulos

### Librerías de estilo
Los estilos han sido realizados mediante @emotion, @mui y @bootstrap

Me han permitido de forma rapida y sencilla la importación y utilización de componentes controlados y estilos predefinidos.

### API Rest
Las Http Request han sido realizadas mediante @axios

Cuando el controlador de los componentes funcionales es disparado por una interacción con la interfaz de usuario realizao las modificaciones en la base de datos mediante Axios, he implementado 3 tipos diferentes de HTTP Request haciendo uso de los metodos POST, GET y DELETE.

En `/client/src/services` podrás encontrar los diferentes servicios asociados a Operations y Marketers

### Gestión de estados
La gestión de estados ha sido realizada mediante @react-redux siguiendo el patrón de diseño Redux.

He separado el estado global en slices para que cada una de estas slices sean gestionadas por reducers especificos, de esta forma segregamos las diferentes funcionalidades aplicables a los estados.

### Enrutamiento
Enrutamiento realizado con @react-router-dom

He hecho una pequeña demostración de como haría un enrutamiento con React Router manteniendo el principio de SPA.

## Server

### Arquitectura basada en controladores
```
src/

En los controladores ejecutamos la lógica de la llamada a la base de datos así como devolvemos la información al cliente
|-- controller/
|   |-- MarketersController.ts
|   |-- OperationsController.ts

Definimos la estructura del esquema de cada entidad
|-- entity/
|   |-- Marketers.ts
|   |-- Operations.ts

En este caso he establecido la relación:
1. Un marketer puede tener muchas operaciones

2. Una operación solo puede tener un marketer
3. Una operación solo puede tener un cliente


Establecemos la configuración de la base de datos
|-- data-source.ts

|-- index.ts

Establecemos los endpoint para recibir las HttpRequest
|-- routes.ts
```

### ORM: TypeORM

He usado TypeORM como una capa de abstracción añadida entre dos interfaces, en este caso Node.js y PostreSQL, me ha permitido mapear objetos de la estructura de la base de datos relacional y transpilarlos a objetos javascript comprensibles por Node.js

### Express

Mientras que TypeORM ha sido la capa de abstracción que me ha permitido interactuar con la base de datos relacional, Express me ha permitido manejar las HTTP Request

### Dotenv

He usado esta librería para guardar variables de entorno en un .env