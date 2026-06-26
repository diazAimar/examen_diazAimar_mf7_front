# Examen Poder Judicial - Diaz Aimar Federico

# Frontend

## Instructivo instalación/ejecución del exámen:

### Pre-requisitos

- Git
- Node y npm/pnpm

### Clonar repositorio

- Clonar el repositorio https://github.com/diazAimar/examen_diazAimar_mf7_front
- En caso de no estarlo, situarse en la rama main (`git checkout main`)
- Copiar el archivo `.env.example`, y renombrarlo como `.env`.
- Instalar las dependencias necesarias con el comando `npm install` o `pnpm install`
- Por ultimo, ejecutar el comando `npm run dev` o `pnpm run dev` para inicializar el proyecto.
- Ingresar al proyecto: http://localhost:5173

### Tecnologías principales utilizadas

#### Cliente

- [Ant Design](https://ant.design/) como librería de componentes
- [react-hook-form](https://react-hook-form.com/) para el estado de los formularios, en conjunto con los componentes de Ant Design
- [@tanstack/react-query](https://tanstack.com/query/latest) para el manejo global de estados asíncronos y [@tanstack/react-table](https://tanstack.com/table/latest) para el diseño de tablas
