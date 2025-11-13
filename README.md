# Prueba Técnica

Este repositorio contiene la solución completa de la prueba técnica, dividida en 3 partes, organizadas en un monorepo.

## 📁 Estructura del Repositorio

* `book-list-app/`
    * **Parte 1: App de Libros.**
    * Un frontend simple en Next.js que consume una API pública.
* `todo-api-serverless/`
    * **Parte 2: API de Tareas (Serverless).**
    * El código de una función AWS Lambda con TypeScript y las instrucciones de despliegue.
* `case-manager-api/`
    * **Parte 3 (Backend): API de Expedientes.**
    * Un backend en Express.js con TypeScript, autenticación JWT y arquitectura N-Capas.
* `case-manager-app/`
    * **Parte 3 (Frontend): App de Expedientes.**
    * Un frontend en Next.js con TailwindCSS, protección de rutas y arquitectura Page -> Controller (Hook) -> Service.

---

## 🚀 Cómo Ejecutar los Proyectos

### 1️⃣ Parte 1: Book List App

1.  Navega a la carpeta del proyecto:
    ```bash
    cd book-list-app
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Abre `http://localhost:3000` en tu navegador.

---

### 2️⃣ Parte 2: To-Do API (Serverless)

Este es un proyecto de backend sin interfaz local. Contiene el código fuente (`src/index.ts`) y las instrucciones detalladas para su despliegue en AWS.

*Consulta `todo-api-serverless/README.md` para las instrucciones de despliegue.*

---

### 3️⃣ Parte 3: Case Manager (Full Stack)

Este proyecto es una aplicación full-stack y requiere **dos terminales** abiertas para funcionar.

#### Terminal 1: Iniciar el Backend (API)

1.  Navega a la carpeta de la API:
    ```bash
    cd case-manager-api
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de la API (con recarga automática):
    ```bash
    npm run dev
    ```
4.  El backend estará corriendo en `http://localhost:3001`.

#### Terminal 2: Iniciar el Frontend (App)

1.  Navega a la carpeta de la app:
    ```bash
    cd case-manager-app
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo del frontend:
    ```bash
    npm run dev
    ```
4.  La aplicación estará disponible en `http://localhost:3000`.

#### 🧪 Credenciales de Prueba

Una vez que ambos servidores estén corriendo, abre `http://localhost:3000`. Serás redirigido a la página de login.

* **Usuario:** `admin`
* **Contraseña:** `password`