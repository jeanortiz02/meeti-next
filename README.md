# Meeti Next

Meeti Next es una aplicación web para crear, administrar y participar en comunidades. El proyecto está construido con Next.js 16, React 19, Better Auth, Drizzle ORM y PostgreSQL.

## Funcionalidades

- Registro, inicio de sesión y cierre de sesión con Better Auth.
- Verificación de correo obligatoria antes de usar la cuenta.
- Recuperación de contraseña por email.
- Panel privado para usuarios autenticados.
- Creación, edición y eliminación de comunidades.
- Subida de imagen para comunidades con UploadThing.
- Unión y salida de comunidades.
- Listado de comunidades creadas y comunidades unidas.
- Políticas de permisos para administradores, miembros y visitantes.
- Notificaciones cuando un usuario se une a una comunidad.
- Notificaciones en tiempo real con Pusher.

## Stack

- Next.js 16 con App Router y Typed Routes.
- React 19.
- TypeScript.
- Tailwind CSS 4.
- Better Auth.
- Drizzle ORM.
- PostgreSQL.
- UploadThing.
- Pusher.
- Nodemailer.
- React Hook Form y Zod.
- Zustand.

## Requisitos

- Node.js compatible con Next.js 16.
- npm.
- Una base de datos PostgreSQL.
- Credenciales SMTP para envío de correos.
- Cuenta y token de UploadThing.
- Aplicación de Pusher.

## Instalación

Instala las dependencias:

```bash
npm install
```

Crea el archivo de variables de entorno:

```bash
cp .env.template .env
```

Completa las variables requeridas en `.env`.

## Variables De Entorno

```env
APP_NAME="Meeti (Development)"
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

UPLOADTHING_TOKEN=

PUSHER_APPID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=

NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

Notas:

- `DATABASE_URL` debe apuntar a PostgreSQL.
- `BETTER_AUTH_URL` debe coincidir con la URL donde corre la aplicación, por ejemplo `http://localhost:3000` en desarrollo.
- `BETTER_AUTH_SECRET` debe ser un valor secreto y estable.
- `NEXT_PUBLIC_PUSHER_KEY` y `NEXT_PUBLIC_PUSHER_CLUSTER` exponen los valores públicos de Pusher al cliente.

## Base De Datos

La configuración de Drizzle está en `drizzle.config.ts` y usa:

- Esquema: `src/db/schema/index.ts`
- Migraciones: `drizzle/`
- Driver: PostgreSQL

Para generar migraciones después de cambiar el esquema:

```bash
npx drizzle-kit generate
```

Para aplicar migraciones:

```bash
npx drizzle-kit migrate
```

Tablas principales:

- `users`, `sessions`, `accounts`, `verifications`: gestionadas por Better Auth.
- `communities`: comunidades creadas por usuarios.
- `community_members`: relación entre usuarios y comunidades.
- `notifications`: notificaciones del usuario.

## Desarrollo

Ejecuta el servidor local:

```bash
npm run dev
```

Abre la aplicación en:

```text
http://localhost:3000
```

Scripts disponibles:

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## Estructura Del Proyecto

```text
app/
  (public)/                 Rutas públicas
  auth/                     Login, registro y recuperación de contraseña
  dashboard/                Panel privado
  api/                      Route Handlers de auth, UploadThing y notificaciones

src/
  db/                       Conexión, esquemas y relaciones de Drizzle
  email/                    Configuración, servicios y templates de email
  features/
    auth/                   Acciones, formularios y validaciones de auth
    communities/            Servicios, repositorios, políticas y componentes
    notifications/          Servicios y componentes de notificaciones
  lib/                      Integraciones compartidas de servidor y cliente
  shared/                   Componentes, formularios y utilidades reutilizables

drizzle/                    Migraciones generadas
public/                     Assets públicos
```

## Rutas Principales

- `/`: inicio público.
- `/nosotros`: página informativa.
- `/communities/[id]`: detalle público de una comunidad.
- `/auth/create-account`: crear cuenta.
- `/auth/login`: iniciar sesión.
- `/auth/forgot-password`: solicitar recuperación de contraseña.
- `/auth/reset-password`: establecer nueva contraseña.
- `/dashboard`: panel privado.
- `/dashboard/communities`: comunidades creadas por el usuario.
- `/dashboard/communities/create`: crear comunidad.
- `/dashboard/communities/joined`: comunidades a las que el usuario se unió.
- `/dashboard/communities/[id]/edit`: editar comunidad.
- `/dashboard/notifications`: notificaciones.

## Arquitectura

El código de negocio está separado por features. Cada módulo agrupa sus acciones de servidor, componentes, validaciones, tipos, repositorios, servicios y políticas.

El flujo general de comunidades usa esta separación:

1. Los formularios validan datos con Zod y React Hook Form.
2. Las server actions reciben la intención del usuario.
3. Los servicios aplican reglas de negocio y permisos.
4. Los repositorios acceden a PostgreSQL mediante Drizzle.
5. Las integraciones externas se encapsulan en `src/lib` y `src/email`.

## Autenticación

La autenticación está configurada en `src/lib/auth.ts` con Better Auth y el adaptador de Drizzle.

Comportamiento actual:

- Email y password habilitados.
- Verificación de correo requerida.
- Inicio de sesión automático después de verificar el correo.
- Envío de correo de verificación al iniciar sesión si el email no está verificado.
- Recuperación de contraseña por email.
- Cookies integradas con Next.js mediante `nextCookies`.

## Subida De Imágenes

UploadThing está configurado en `app/api/uploadthing/core.ts`.

Restricciones actuales:

- Solo usuarios autenticados pueden subir imágenes.
- El uploader `meetiUploader` acepta imágenes.
- Tamaño máximo: `1MB`.
- Cantidad máxima: `1` archivo.

Cuando se elimina una comunidad, también se intenta eliminar su imagen remota desde UploadThing.

## Notificaciones

Las notificaciones se guardan en PostgreSQL y se emiten por Pusher. Cuando un usuario se une a una comunidad, el creador recibe una notificación con el nombre del actor, el mensaje y la comunidad objetivo.

## Despliegue

La aplicación puede desplegarse en cualquier plataforma compatible con Next.js que permita:

- Ejecutar Next.js en producción.
- Configurar variables de entorno.
- Conectarse a PostgreSQL.
- Recibir webhooks o tráfico de UploadThing si se usa subida de archivos.

Antes de desplegar:

1. Configura todas las variables de entorno de producción.
2. Aplica las migraciones de Drizzle en la base de datos.
3. Verifica que `BETTER_AUTH_URL` apunte al dominio final.
4. Configura Pusher, SMTP y UploadThing con credenciales de producción.
