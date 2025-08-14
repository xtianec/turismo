## Guía turística – desarrollo local

Este repositorio contiene el backend en `guia-turistica-backend` y el
frontend en `guia-turistica-frontend`.

### Variables de entorno

Backend (`guia-turistica-backend/.env`):

```
PORT=3000
CLIENT_URL=http://localhost:5173
JWT_SECRET=changeme
```

Frontend (`guia-turistica-frontend/.env`):

```
VITE_API_URL=http://localhost:3000
```

### Ejecución

1. Instalar dependencias en cada paquete (`npm install`).
2. Iniciar el backend: `npm run dev` desde `guia-turistica-backend`.
3. Iniciar el frontend: `npm run dev` desde `guia-turistica-frontend`.

El frontend consumirá el API configurada en `VITE_API_URL` y el backend
aceptará peticiones desde `CLIENT_URL`.
