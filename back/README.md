**Nombre y Apellido:** Mirko Federico Iuliano  
**Nombre de la Materia:** Aplicaciones Híbridas  
**Nombre del docente:** Jonathan Cruz  
**Comisión:** DWM4AP

#### Este proyecto simula una API REST de una escuela que tiene alumnos con sus respectivas materias. Existen 3 Modelos: User, Student y Subject. Cada uno tiene sus respectivas rutas y controladores que permiten hacer las funciones de un CRUD (crear, leer, actaulizar y borrar).
#### Además hice dos filtros: uno para Student y otro para Subject. El de Student filtra por año de cursada y deveulve todos los alumnos que están en un mismo año y el de Subject filtra por materia y devuelve a todos los alumnos que están en esa materia

## Requisitos para utilizar el proyecto:
- **MongoDB**
- **MongoDB Compass**

Video tutorial para descargrse estos dos e instalarlo bien en su PC: [video tutorial](https://www.youtube.com/watch?v=eKXIxSZrJfw&t=471s&ab_channel=UskoKruM2010)

## Para poder poner en funcionamiento el proyecto debe hacer los siguientes pasos:
1. Crear un archivo nuevo en carpeta raíz llamado ".env".
2. Copiar el contenido del archivo ".envExmple" y pegarlo en el nuevo archivo ".env".
3. En la terminal del proyecto (podes abrirla con 'Ctrl + Ñ') ejecutar el siguiente comando: 
 ```bash 
 npm i 
  ```
 Esto descargará la carpeta node_modules, que es necesaria para el funcionamiento del proyecto.    

4. Encender MongoDB en su PC.
5. Por último se debe ejecutar el siguiente comando en la terminal del proyecto:
```bash 
 npm start
  ```
Esto dará inicio al proyecto y lo conectará con el servidor  



### Para más información de cómo usar la API, ingresa al index.html desde tu navegador y allí encontrarás más instrucciones 