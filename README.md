# Plantilla Dashboard Vue 3, Vuetify 3 y Pinia 

Contenido
-------
- [Primeros pasos](#primeros-pasos)
    - [Requisitos del sistema](#requisitos-del-sistema)
    - [Preparar el proyecto](#preparar-el-proyecto)
- [Estructura de directorios](#estructura-de-directorios)
- [Componentes globales](#componentes-globales)
    - [Datatable Component (Paginación)](#datatable-component)
-------
# Primeros pasos
## Preparar el proyecto

Descargamos el desde este repositorio con el comando

```
git clone {url-del-repositorio}
```

Debemos iniciar el proyecto en la rama *master* que es la mas actualizada y estable.

### Instalamos las dependencias de desarrollo.

```
npm install
```

### Compilar y habilitar hot-reloads para desarrollo
```
npm run serve
```

## Estructura de directorios
La carpeta src tiene la siguiente estructura de directorios.

```
+-- assets
+-- components
+-- layouts
+-- models
|   +-- Model_1
|       +-- model_1.ts
|   +-- Model_2
|   +-- ...
+-- modules
|   +-- module_1
|       +-- components
|       +-- models
|       +-- router
|       +-- services
|       +-- stores
|       +-- views
|   +-- module_2
|   +-- ...
+-- plugins
+-- router
+-- services
+-- stores
+-- styles
+-- views
+-- App.vue
+-- main.ts
```

**asstes:** Contiene todos los archivos estaticos del proyecto como imagenes, logos, animaciones etc.

**components:** Contiene todos los componentes globales del proyecto, son todos aquellos que se pueden utilizar en diferentes modulos.

**layout:** Son los diferentes componentes que definen la posicion de los elementos en las interfaces del proyecto.

**models:** Contiene las clases/interfaces que definen las propiedades de cada modelo.

**modules** Son los diferentes modulos que componen el sistema, dentro de cada modulo hay una nueva estructura de carpeta que contiene los componentes, modelos, rutas, servicios, stores, y vistas porpias de cada modulo y que no se utilizan en ningun otro, en caso de que algo sea utilizado desde otro modulo pasa a convertirse en global.

**plugins:** Contiene la configuracion de todos los plugins propios y de terceros que se utilizan en el proyecto como son, vuetify, axios y las notificaciones.

**router:** Contiene la configuración de rutas generales.

**services:** Contiene los diferentes servicios que utiliza el proyecto, aqui se almacena la capa de acceso a datos, ya sea que los consuma de una API REST o de cualquier otro origen.

**stores:** Los diferentes stores para el manejo del estado de la aplicacion.

**styles:** Estilos globales del proyecto.

**views:** Vistas generales del proyecto que no pertenecen a ningun modulo en espesifico como la pagina de error 404.

## Componentes globales
En esta seccion se se detalla el uso y funcionamiento de los componentes globales del proyecto.

### Datatable Component
Este componente ha sido diseñado para facilitar la representacion de datos tabulados, la paginación y la busqueda de datos.