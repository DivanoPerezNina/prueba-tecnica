# API Serverless de Tareas (Prueba 2)

Este proyecto implementa un endpoint REST serverless en AWS usando API Gateway, AWS Lambda (con Node.js y TypeScript) y DynamoDB para gestionar una lista de tareas (to-do).

## 🚀 Pre-requisitos locales

Antes de desplegar, necesitas compilar el código de TypeScript a JavaScript.

1.  Abre una terminal en esta carpeta (`todo-api-serverless`).
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Compila el proyecto:
    ```bash
    npm run build
    ```
    Esto generará un archivo `dist/index.js`. Comprime este archivo en un **`.zip`** (ej: `dist.zip`), ya que lo necesitarás para subirlo a Lambda.

---

## ☁️ Pasos de Despliegue (Consola de AWS)

Sigue estos pasos para desplegar la aplicación manualmente desde la consola de AWS.

### Parte 1: Crear la Tabla en DynamoDB

1.  Ve al servicio **DynamoDB** en la consola de AWS.
2.  Haz clic en **"Crear tabla"**.
3.  **Nombre de la tabla:** `tec-practicantes-todo` (o el nombre que prefieras).
4.  **Clave de partición:** `id` (asegúrate de que el tipo sea `String`).
5.  Deja el resto de la configuración por defecto y haz clic en **"Crear tabla"**.

### Parte 2: Crear la Función AWS Lambda

1.  Ve al servicio **Lambda** en la consola de AWS.
2.  Haz clic en **"Crear función"**.
3.  Elige la opción **"Autor desde cero"**.
4.  **Nombre de la función:** `todo-api-handler` (o un nombre descriptivo).
5.  **Runtime:** Selecciona `Node.js 18.x`.
6.  **Arquitectura:** Deja `x86_64`.
7.  Haz clic en **"Crear función"**.

### Parte 3: Configurar la Función Lambda

Una vez creada la función, hay 3 configuraciones importantes:

**A. Subir el Código:**

1.  En la pestaña "Código", busca el recuadro "Código fuente".
2.  Haz clic en el botón **"Cargar desde"** y selecciona **".zip file"**.
3.  Sube el archivo `dist.zip` que creaste en los pre-requisitos.
4.  Haz clic en **"Guardar"**.

**B. Añadir Permisos para DynamoDB:**

La función necesita permiso para leer y escribir en tu tabla.

1.  Ve a la pestaña **"Configuración"** > **"Permisos"**.
2.  Haz clic en el **"Nombre del rol"** (esto te llevará a la consola de IAM).
3.  En la página de IAM, haz clic en **"Añadir permisos"** > **"Adjuntar políticas"**.
4.  En el filtro, busca y selecciona la política `AmazonDynamoDBFullAccess`.
    *(**Nota:** Para producción, crearías una política más restrictiva, pero para esta prueba, esta es la más rápida).*
5.  Haz clic en **"Adjuntar políticas"**.

**C. Configurar Variables de Entorno:**

Nuestro código necesita saber el nombre de la tabla.

1.  Regresa a la página de tu función Lambda.
2.  Ve a **"Configuración"** > **"Variables de entorno"** y haz clic en **"Editar"**.
3.  Haz clic en **"Añadir variable de entorno"**.
    * **Clave:** `TABLE_NAME`
    * **Valor:** `tec-practicantes-todo` (o el nombre que le diste a tu tabla).
4.  Haz clic en **"Guardar"**.

### Parte 4: Crear el Trigger de API Gateway

Finalmente, vamos a exponer nuestra función como un endpoint HTTP.

1.  En la página principal de tu función Lambda, haz clic en **"Añadir trigger"** (o "Añadir disparador").
2.  En el menú desplegable, selecciona **"API Gateway"**.
3.  Elige **"Crear una nueva API"**.
4.  Tipo de API: **`REST API`**.
5.  Seguridad: **`Open`** (Abierta).
6.  Haz clic en **"Añadir"**.

Una vez creado, la consola te mostrará una **"URL de punto de enlace de la API"**. ¡Cópiala! Se verá algo así: `https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/default/todo-api-handler`

---

## 🧪 Cómo Probar la API

Puedes usar `curl` o cualquier cliente API (como Postman) con la URL que copiaste.

**Reemplaza `<TU_URL_DE_API_GATEWAY>` con tu URL.**

### Probar GET (Listar Tareas)

```bash
curl -X GET <TU_URL_DE_API_GATEWAY>