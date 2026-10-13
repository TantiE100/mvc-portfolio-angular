# mvc-portfolio-angular

Migración de `mvc-portfolio` (PHP vanilla con MVC propio + PostgreSQL) a **Angular**. El sitio es el mismo currículum / portafolio, ahora completamente en español, con la plantilla [iPortfolio](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/) de BootstrapMade, y todo el contenido sigue saliendo de la base de datos.

## Qué cambió respecto a la versión PHP

| Capa          | mvc-portfolio (PHP)                                  | mvc-portfolio-angular                                          |
|---------------|------------------------------------------------------|----------------------------------------------------------------|
| Modelo        | `ProfileModel`, `ContactMessageModel` (PDO)           | Igual, en `api/src/Models`                                     |
| Controlador   | `PortfolioController` renderiza HTML                  | Solo controladores JSON en `api/src/Controllers/Api`           |
| Vista         | `Views/portfolio/index.php` + `partials/*.php`        | Componentes Angular en `web/src/app` (uno por partial)         |
| JS plantilla  | `main.js`, typed.js, PureCounter, Waypoints, Isotope  | Signals, directiva `InView` (IntersectionObserver), typed.js, AOS |
| Formulario    | `validate.js` con POST `/contact` que responde `OK`   | Reactive Forms con POST `/api/contact` que responde JSON      |
| Idioma        | Inglés                                               | Español (textos, datos del seed, mensajes de la API, fechas con locale `es`) |

Equivalencia de vistas:

| Partial PHP      | Componente Angular            |
|------------------|-------------------------------|
| `index.php`      | `portfolio-page.ts`           |
| `sidebar.php`    | `layout/sidebar.ts` (menú móvil y scrollspy con signals) |
| `footer.php`     | `layout/footer.ts`            |
| `hero.php`       | `sections/hero.ts`            |
| `about.php`      | `sections/about.ts`           |
| `stats.php`      | `sections/stats.ts` + `core/count-up.ts` |
| `skills.php`     | `sections/skills.ts`          |
| `resume.php`     | `sections/resume.ts`          |
| `portfolio.php`  | `sections/portfolio.ts` (filtros y lightbox propios) |
| `services.php`   | `sections/services.ts`        |
| `contact.php`    | `sections/contact.ts`         |

## Estructura

```
api/                 backend PHP (MVC sin vistas, solo JSON)
  public/index.php   front controller + router
  src/               Config, Core/Router, Controllers/Api, Models
  db/migrations/     esquema SQL versionado
  bin/               migrate.php, seed.php (se ejecutan solos al arrancar el contenedor)
web/                 frontend Angular 22 (standalone, zoneless, signals)
  src/app/core/      modelos, servicio PortfolioApi (httpResource), helpers
  src/app/layout/    sidebar, footer
  src/app/sections/  una sección por componente
  nginx.conf         sirve el build y hace proxy de /api al backend
compose.yml
```

## Levantar con Docker (todo junto)

```
cp .env.example .env
docker compose up -d --build
```

Abrir `http://localhost:8094/`. Las migraciones y el seed corren automáticamente al iniciar el contenedor `api`.

## Desarrollo del frontend con `ng serve`

Con la base y la API levantadas (`docker compose up -d db api`):

```
cd web
npm install
npm start
```

Abrir `http://localhost:4200/`. `proxy.conf.json` redirige `/api` a `http://localhost:8093`.

## Puertos

- Web (nginx + build de Angular): `8094`
- API (Apache + PHP): `8093`
- Postgres: `5436` (interno `5432`)

Elegidos para no chocar con `mvc-portfolio` (8092 / 5435).

## API

| Método | Ruta           | Qué hace                                                     |
|--------|----------------|--------------------------------------------------------------|
| GET    | `/api/profile` | Devuelve todo el CV en JSON                                  |
| POST   | `/api/contact` | Guarda el mensaje (`name`, `email`, `subject`, `message`); `201 {"ok":true}` o `422 {"error": ...}` |

## Base de datos

Mismo esquema que la versión PHP. El seed solo carga datos si `profile` está vacía; para recargarlo desde cero: `docker compose down -v && docker compose up -d --build`.

Tablas: `profile`, `social_links`, `stats`, `skills`, `resume_items`, `portfolio_items`, `services`, `contact_messages`. `portfolio_items` se carga con capturas reales de los otros proyectos de la materia (Cinelatino, Framenotes, Wara Bolivia, Diario Digital, plantilla MVC), guardadas en `web/public/assets/img/portfolio/`. Los filtros salen de las categorías de la tabla (`Angular`, `PHP MVC`). Si la tabla queda vacía, la sección Portafolio y su enlace en el menú se ocultan.

```
docker compose exec db psql -U portfolio_user -d portfolio -c "UPDATE skills SET percent = 90 WHERE name = 'Go';"
docker compose exec db psql -U portfolio_user -d portfolio -c "SELECT created_at, name, subject FROM contact_messages ORDER BY created_at DESC;"
```

## Imágenes por sección

Todas las rutas de imagen se guardan en la base (migración `0004_section_images.sql`), igual que el resto del contenido.

| Sección       | Imagen                                                        | Columna                         |
|---------------|---------------------------------------------------------------|---------------------------------|
| Inicio        | Foto de portada                                               | `profile.hero_path`             |
| Sobre mí      | Foto de perfil                                                | `profile.avatar_path`           |
| Estadísticas  | Panorámica de Cochabamba de fondo                             | `profile.stats_bg_path`         |
| Habilidades   | Logo de cada tecnología                                       | `skills.logo_path`              |
| Currículum    | Sede Unifranz Cochabamba, Plaza 14 de Septiembre, repo en GitHub | `resume_items.image_path`    |
| Portafolio    | Capturas de los proyectos de la materia                       | `portfolio_items.image_path`    |
| Servicios     | Logo de cada tecnología                                       | `services.logo_path`            |
| Contacto      | Vista de la ciudad de Cochabamba                              | `profile.city_image_path`       |

Las fotos de Cochabamba y Unifranz son de Wikimedia Commons (CC BY / CC BY-SA) y los logos son de Simple Icons (CC0). Autores y licencias en `web/public/assets/img/CREDITS.txt`, enlazado también desde el footer.

## Licencia de la plantilla

iPortfolio es gratuita con atribución: los enlaces a BootstrapMade en el footer deben quedarse (ver `web/public/assets/TEMPLATE-LICENSE.txt`).
