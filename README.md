# Grupo Oper | Prueba Técnica

## Tecnologías
- Vue 3 + Composition API
- TailwindCSS
- Node.js + Express
- Sequelize + MySQL
- Vite

## Instalación
```bash
git clone git@github.com:AlmaCRH/operCanarios-library.git
cd repo
## Instalar las dependencias del front y del backend a continuación.
cd front -> npm i
cd back -> npm i
## Para hacer uso de las variables de enterno del backend:
back -> touch .env -> y rellenar las siguientes variables que aparecen en el .env.example con sus datos
## Para lanzar ambos lados
front -> npm run dev
back -> node index.js
```

## Objetivos de la prueba
- Crear una API REST con un CRUD básico (Create, Read, Update, Delete).
- Guardar los libros, en este caso se ha hecho uso de una base de datos.
- Validar que titulo, auto y anioPublicación son obligatorios.
- Usar CORS para acceder desde el front.
- Ejecturar el CRUD en el front.

