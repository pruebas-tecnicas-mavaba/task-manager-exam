# Task Manager Exam

Aplicación tipo Task Manager construida con arquitectura distribuida:

- **Frontend:** React
- **API Gateway:** Node.js
- **Backend:** Go
- **Base de datos:** Google Firestore
- **Deploy Backend:** Google Cloud Run
- **Deploy Frontend:** Firebase Hosting

---

## Arquitectura

El flujo de la aplicación es el siguiente:

React Frontend → Node.js API Gateway → Go Task Service → Firestore

### Responsabilidades

- **Frontend (React):**
  - Mostrar lista de tareas
  - Crear tareas
  - Marcar tareas como completadas
  - Eliminar tareas
  - Renderizar lista con virtual scroll

- **API Gateway (Node.js):**
  - Expone la API pública
  - Recibe solicitudes del frontend
  - Orquesta llamadas al servicio de tareas en Go

- **Backend (Go):**
  - Maneja la lógica de negocio
  - Valida operaciones
  - Accede a Firestore

- **Firestore:**
  - Persiste la información de las tareas

---

## Funcionalidades implementadas

- Ver lista de tareas
- Crear nueva tarea
- Marcar tarea como completada
- Eliminar tarea
- Virtual scroll en la lista de tareas
- Tachado visual para tareas completadas
- Visualización de:
  - id
  - título
  - descripción
  - fecha de creación
  - hora de creación

---

## Stack tecnológico

### Frontend
- React
- Vite
- Mantine
- react-window

### Backend
- Node.js
- Express
- Go
- Gin

### Infraestructura
- Google Cloud Run
- Firebase Hosting
- Google Firestore

---

## Estructura del proyecto

```bash
.
├── frontend
├── api-gateway
├── backend
└── docs