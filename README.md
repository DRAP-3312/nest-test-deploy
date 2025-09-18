# 📋 Task Manager API

> Proyecto de prueba para aprender deployment de aplicaciones backend en producción

## 📖 Descripción

**Task Manager API** es una aplicación backend desarrollada con **NestJS** y **MongoDB** que implementa un sistema completo de gestión de tareas. Este proyecto fue creado específicamente como ejercicio de aprendizaje para practicar el deployment de APIs en producción utilizando **Docker** y **Docker Compose**.

### ✨ Funcionalidades

- **🏷️ Gestión de Categorías**: CRUD completo para categorías de tareas
- **📝 Gestión de Tareas**: CRUD completo para tareas con relaciones a categorías
- **🔍 Validación de datos**: Validación robusta con class-validator
- **📚 Documentación automática**: Swagger UI integrado
- **🏥 Health checks**: Endpoint de monitoreo de salud
- **🐳 Containerización**: Completamente dockerizado para deployment

### 🛠️ Stack Tecnológico

- **Backend**: NestJS (Node.js + TypeScript)
- **Base de datos**: MongoDB con Mongoose
- **Validación**: class-validator + class-transformer
- **Documentación**: Swagger/OpenAPI
- **Containerización**: Docker + Docker Compose
- **Gestión de paquetes**: pnpm

## 🚀 Inicio Rápido

### Prerrequisitos

- **Docker** y **Docker Compose** instalados
- Puerto **3000** y **27017** disponibles

### 🐳 Deployment con Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd nest-test-deploy

# 2. Levantar toda la infraestructura
docker-compose up -d

# 3. Verificar que los servicios estén funcionando
docker-compose ps
```

¡Listo! La aplicación estará disponible en:
- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health

### 📊 Datos de Ejemplo

La aplicación se inicializa automáticamente con datos de ejemplo:
- **4 categorías**: Work, Personal, Learning, Health
- **5 tareas** con diferentes estados y prioridades

### 🛠️ Comandos de Docker

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f api
docker-compose logs -f mongodb

# Parar servicios
docker-compose down

# Parar y eliminar datos (⚠️ elimina la base de datos)
docker-compose down -v

# Reconstruir y levantar (después de cambios en código)
docker-compose up --build -d
```

## 💻 Desarrollo Local (Opcional)

Si prefieres ejecutar sin Docker:

### Setup del proyecto

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración de MongoDB
```

### Ejecutar la aplicación

```bash
# Modo desarrollo (con watch)
pnpm run start:dev

# Modo producción
pnpm run start:prod

# Build del proyecto
pnpm run build
```

### Ejecutar tests

```bash
# Tests unitarios
pnpm run test

# Tests e2e
pnpm run test:e2e

# Cobertura de tests
pnpm run test:cov
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Estado de la aplicación

### Categorías
- `GET /categories` - Listar todas las categorías
- `GET /categories/:id` - Obtener categoría por ID
- `POST /categories` - Crear nueva categoría
- `PATCH /categories/:id` - Actualizar categoría
- `DELETE /categories/:id` - Eliminar categoría

### Tareas
- `GET /tasks` - Listar todas las tareas (con información de categorías)
- `GET /tasks/:id` - Obtener tarea por ID
- `POST /tasks` - Crear nueva tarea
- `PATCH /tasks/:id` - Actualizar tarea
- `DELETE /tasks/:id` - Eliminar tarea

### Documentación
- `GET /api` - Swagger UI con documentación completa

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Docker        │    │   Docker         │    │   Volume        │
│   Container     │    │   Container      │    │   (Persistent)  │
│                 │    │                  │    │                 │
│   NestJS API    │◄──►│   MongoDB        │◄──►│   Database      │
│   Port: 3000    │    │   Port: 27017    │    │   Storage       │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
          ▲                        ▲
          │                        │
          └────────────────────────┘
               Internal Network
             (172.20.0.0/16)
```

## 🔧 Configuración

### Variables de Entorno

El proyecto utiliza las siguientes variables de entorno:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/taskmanager
MONGODB_NAME=taskmanager

# Application
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-secret-key
```

### Estructura del Proyecto

```
nest-test-deploy/
├── src/
│   ├── categories/          # Módulo de categorías
│   ├── tasks/              # Módulo de tareas
│   ├── common/             # Enums y utilidades compartidas
│   ├── app.module.ts       # Módulo principal
│   └── main.ts            # Punto de entrada
├── deploy/
│   ├── docker-compose.prod.yml  # Configuración de producción
│   └── init-mongo.js           # Scripts de BD para producción
├── docker/
│   └── mongodb/           # Scripts de inicialización de DB (desarrollo)
├── Dockerfile             # Imagen de la API
├── docker-compose.yml     # Desarrollo local
└── README.md             # Este archivo
```

## 🚀 Próximos Pasos

Este proyecto es una base sólida para aprender sobre:

1. **CI/CD**: Integrar con GitHub Actions o GitLab CI
2. **Cloud Deployment**: Deploy en AWS, Google Cloud, o DigitalOcean
3. **Monitoring**: Agregar logging avanzado y métricas
4. **Security**: Implementar autenticación JWT y rate limiting
5. **Performance**: Agregar caching con Redis
6. **Testing**: Ampliar cobertura de tests

## 📚 Recursos Útiles

- [NestJS Documentation](https://docs.nestjs.com)
- [Docker Documentation](https://docs.docker.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).
