# 🎬 Butaca Libre

**Butaca Libre** es una aplicación web que permite a las personas encontrar compañía para ir al cine. Los usuarios pueden explorar planes publicados por otras personas, unirse a una función, crear sus propios planes y comunicarse mediante un chat.

La idea nace de una situación sencilla: **quieres ver una película que está en cartelera, pero no tienes con quién ir.**

## ✨ Características

* 🔐 **Registro e inicio de sesión**

  * Creación de cuentas con correo y contraseña.
  * Restricción de edad para mayores de 18 años.
  * Confirmación de correo electrónico mediante Supabase.

* 🎟️ **Planes de cine**

  * Explorar funciones disponibles.
  * Filtrar planes por película.
  * Consultar cine, ubicación, sala, fecha y hora.
  * Visualizar los cupos disponibles.
  * Unirse o salir de un plan.

* 🎬 **Crear un plan**

  * Seleccionar una película.
  * Indicar el cine y ubicación.
  * Elegir el tipo de sala.
  * Definir fecha y hora.
  * Elegir el número total de personas.
  * Añadir una nota sobre cómo quieres vivir la función.

* 👥 **Perfiles**

  * Nombre y edad.
  * Biografía.
  * Géneros cinematográficos favoritos.
  * Película de confort.
  * Indicador de perfil verificado.

* 💬 **Chat**

  * Chat asociado a cada plan.
  * Los participantes pueden comunicarse antes de la función.
  * El chat se actualiza periódicamente.
  * Se cierra cuando el plan alcanza su capacidad.

* 🛡️ **Seguridad y comunidad**

  * Bloqueo de usuarios.
  * Desbloqueo de usuarios.
  * Reporte de comportamientos inapropiados.
  * Opción de bloquear a una persona al realizar un reporte.
  * Los anfitriones pueden gestionar y retirar participantes de sus planes.

* 🍿 **Cartelera**

  * Integración con una cartelera externa mediante un archivo `data/peliculas.json`.
  * Se pueden mostrar títulos y posters.
  * La aplicación puede funcionar también con películas de ejemplo si la cartelera no está disponible.

## 🛠️ Tecnologías

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive design
* Google Fonts — Bricolage Grotesque

### Backend / Servicios

* Supabase

  * Supabase Auth
  * PostgreSQL
  * Supabase RPC
  * Row Level Security mediante la configuración de la base de datos

### APIs / Datos externos

* TMDB para información de películas y posters.

La aplicación carga la cartelera desde `data/peliculas.json` y utiliza los títulos y posters proporcionados por ese archivo.

## 📱 Flujo de la aplicación

### 1. Crear una cuenta

El usuario se registra proporcionando:

* Nombre
* Edad
* Correo electrónico
* Contraseña

La aplicación utiliza Supabase Auth para gestionar las cuentas.

### 2. Explorar planes

En la sección **Planes**, el usuario puede visualizar las funciones publicadas por otros usuarios y filtrarlas por película.

Cada tarjeta muestra información como:

* Película
* Cine
* Ubicación
* Tipo de sala
* Fecha y hora
* Anfitrión
* Gustos del anfitrión
* Número de cupos disponibles

### 3. Unirse a un plan

Si existen cupos disponibles, el usuario puede seleccionar **Unirme**.

Una vez dentro, puede acceder al chat asociado al plan.

### 4. Crear un plan

Desde **Crear plan**, el usuario puede publicar una nueva función indicando todos los detalles de la salida.

Los planes pueden tener entre **2 y 8 personas**.

### 5. Comunicarse

Los participantes pueden utilizar el chat del plan para ponerse de acuerdo antes de la función.

El chat consulta periódicamente nuevos mensajes y permite enviar mensajes asociados al plan.

## 🗂️ Estructura del proyecto

Una estructura recomendada para el proyecto es:

```text
butaca-libre/
│
├── index.html
│
├── data/
│   └── peliculas.json
│
└── README.md
```

Actualmente la interfaz, estilos y lógica principal de la aplicación están contenidos en `index.html`.

## ⚙️ Configuración

### 1. Crear un proyecto en Supabase

Crea un proyecto en:

https://supabase.com/

Después configura las tablas necesarias para:

* `perfiles`
* `planes`
* `participantes`
* `bloqueos`
* `mensajes`
* `reportes`

La aplicación utiliza además la función RPC:

```text
cupos_libres
```

para calcular los cupos disponibles de cada plan.

## 🔑 Configurar Supabase

En `index.html` se configuran las credenciales públicas de Supabase:

```javascript
const SUPABASE_URL="TU_SUPABASE_URL";
const SUPABASE_KEY="TU_SUPABASE_PUBLISHABLE_KEY";
```

### ⚠️ Importante

La aplicación utiliza una **publishable/anon key**, que está diseñada para utilizarse desde aplicaciones frontend.

**Nunca debes colocar en el frontend:**

```text
service_role
secret keys
private API keys
```

La protección de los datos debe realizarse mediante las políticas de seguridad de Supabase, especialmente **Row Level Security (RLS)**.

## 🎞️ Cartelera

La aplicación busca:

```text
data/peliculas.json
```

El archivo debe contener una estructura similar a:

```json
{
  "peliculas": [
    {
      "titulo": "Nombre de la película",
      "poster": "https://example.com/poster.jpg"
    }
  ]
}
```

Si el archivo no está disponible o no contiene películas, la aplicación utiliza una lista de películas de ejemplo.

## 🚀 Ejecutar localmente

Puedes ejecutar el proyecto utilizando cualquier servidor web estático.

Por ejemplo, con Python:

```bash
python -m http.server 8000
```

Después abre:

```text
http://localhost:8000
```

También puedes utilizar extensiones como **Live Server** en Visual Studio Code.

## 🎯 Objetivo del proyecto

Butaca Libre busca solucionar un problema social y cotidiano:

> **Encontrar a alguien con quien compartir una película que quieres ver en el cine.**

En lugar de centrarse únicamente en descubrir películas, la aplicación se centra en **descubrir personas y planes alrededor del cine**.

## 🔮 Próximas mejoras

Algunas funcionalidades que pueden incorporarse en futuras versiones:

* 🤖 Sistema de recomendación de compañeros basado en intereses.
* 📍 Integración con geolocalización.
* 🎞️ Información más completa de películas.
* ⭐ Sistema de valoraciones después de una función.
* 🛡️ Sistema de verificación de identidad.
* 🔔 Notificaciones.
* 📱 Aplicación móvil nativa.
* 🧠 Matching automático entre usuarios.
* 🗓️ Integración directa con horarios reales de los cines.
* 🖼️ Subida de fotografías de perfil.
* 🔎 Filtros avanzados para encontrar planes.
* 🚨 Sistema de moderación automática.

## 🔒 Privacidad y seguridad

Butaca Libre maneja información proporcionada directamente por sus usuarios, incluyendo perfiles, participación en planes, mensajes y reportes.

Por ello, antes de utilizar el proyecto en producción se recomienda configurar correctamente:

* Row Level Security (RLS).
* Políticas de acceso por tabla.
* Validación de permisos en operaciones sensibles.
* Protección contra abuso y spam.
* Moderación de contenido.
* Manejo seguro de información personal.

## 📄 Estado del proyecto

🚧 **Proyecto en desarrollo / MVP**

La versión actual implementa el flujo principal de:

```text
Registro
   ↓
Perfil
   ↓
Explorar planes
   ↓
Crear / unirse a un plan
   ↓
Chat
   ↓
Gestión de participantes
```

## 👩‍💻 Autora

**Luceth Argote**

Intereses: **Inteligencia Artificial · Ciencia de Datos · Desarrollo de Software**

---

⭐ Si te interesa el proyecto, puedes contribuir proponiendo nuevas funcionalidades, reportando errores o mejorando la experiencia de usuario.
