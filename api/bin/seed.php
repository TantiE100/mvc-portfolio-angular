<?php

require __DIR__ . '/../src/bootstrap.php';

use App\Config\Database;

$pdo = Database::connection();

$count = (int) $pdo->query('SELECT COUNT(*) FROM profile')->fetchColumn();
if ($count > 0) {
    echo "La tabla profile ya tiene datos, se omite el seed.\n";
    exit(0);
}

$pdo->beginTransaction();

$pdo->prepare('
    INSERT INTO profile (
        full_name, headline, typed_roles, about_intro, about_summary, about_extra,
        birth_date, website, phone, city, degree, email, freelance, address,
        avatar_path, hero_path, latitude, longitude, map_span
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
')->execute([
    'Santiago Echeverria',
    'Estudiante de Ingeniería de Sistemas y desarrollador backend',
    'desarrollador backend, estudiante de Ingeniería de Sistemas, desarrollador Go, entusiasta de Docker',
    'Estudiante de sexto semestre de Ingeniería de Sistemas en Unifranz. Construyo aplicaciones web con Go, Node y Next.js sobre PostgreSQL, y las despliego en contenedores.',
    'Me gusta entender cómo funcionan las cosas por dentro: routers, capas de datos, contenedores y orquestación. Este portafolio es un ejemplo de eso: un frontend en Angular que consume la API JSON de un MVC en PHP escrito a mano, con todo el contenido guardado en PostgreSQL.',
    'Actualmente curso Programación V en Unifranz y trabajo sobre todo en backend e infraestructura. Busco pasantías o proyectos donde pueda seguir creciendo en arquitectura backend y Kubernetes.',
    '2005-10-20',
    'github.com/TantiE100',
    '+591 76961855',
    'Cochabamba, Bolivia',
    'Universitario (en curso)',
    'santy10mcpe@gmail.com',
    'Disponible',
    'Cochabamba, Bolivia',
    'assets/img/profile.jpg',
    'assets/img/hero.jpg',
    -17.377530,
    -66.128214,
    0.02,
]);

$socials = [
    [1, 'github', 'bi bi-github', 'https://github.com/TantiE100'],
    [2, 'linkedin', 'bi bi-linkedin', 'https://www.linkedin.com/in/santi-echeverria/'],
    [3, 'instagram', 'bi bi-instagram', 'https://www.instagram.com/santiecheverr1a/'],
    [4, 'twitter', 'bi bi-twitter-x', 'https://x.com/tantimane100'],
];
$stmt = $pdo->prepare('INSERT INTO social_links (sort_order, css_class, icon, url) VALUES (?, ?, ?, ?)');
foreach ($socials as $row) {
    $stmt->execute($row);
}

$stats = [
    [1, 'bi bi-mortarboard', 6, 'Semestres', 'de Ingeniería de Sistemas'],
    [2, 'bi bi-stack', 6, 'Tecnologías', 'que uso día a día'],
    [3, 'bi bi-hdd-network', 2, 'Años', 'trabajando con contenedores'],
    [4, 'bi bi-cup-hot', 900, 'Horas', 'frente al editor'],
];
$stmt = $pdo->prepare('INSERT INTO stats (sort_order, icon, value, label, caption) VALUES (?, ?, ?, ?, ?)');
foreach ($stats as $row) {
    $stmt->execute($row);
}

$skills = [
    [1, 'Go', 85],
    [2, 'Node.js', 80],
    [3, 'Next.js', 75],
    [4, 'PostgreSQL', 80],
    [5, 'Docker', 80],
    [6, 'Kubernetes', 65],
];
$stmt = $pdo->prepare('INSERT INTO skills (sort_order, name, percent) VALUES (?, ?, ?)');
foreach ($skills as $row) {
    $stmt->execute($row);
}

$resume = [
    [
        'education', 1,
        'Ingeniería de Sistemas (en curso)',
        '2024 - Actualidad',
        'Universidad Privada Franz Tamayo (Unifranz), Cochabamba',
        'Actualmente en sexto semestre. Materias enfocadas en programación, bases de datos y programación gráfica y multimedia.',
        null,
    ],
    [
        'education', 2,
        'Educación primaria y secundaria',
        'Hasta 2023',
        'Colegio Capilla, Cochabamba',
        'Primaria y secundaria completas en el mismo colegio.',
        null,
    ],
    [
        'experience', 1,
        'Práctica en backend e infraestructura',
        '2024 - Actualidad',
        'Proyectos personales y universitarios',
        null,
        '{"Servicios en Go y Node.js con PostgreSQL","Aplicaciones full stack con Next.js en el frontend","Entornos de desarrollo en contenedores con Docker y docker compose","Primeros despliegues en Kubernetes"}',
    ],
];
$stmt = $pdo->prepare('INSERT INTO resume_items (kind, sort_order, title, period, place, body, bullets) VALUES (?, ?, ?, ?, ?, ?, ?)');
foreach ($resume as $row) {
    $stmt->execute($row);
}

$services = [
    [1, 'bi bi-hdd-stack', 'Desarrollo backend', 'Servicios HTTP y APIs en Go y Node.js, con una separación clara entre transporte, dominio y acceso a datos.'],
    [2, 'bi bi-database', 'Modelado de datos', 'Diseño de esquemas en PostgreSQL, migraciones versionadas y consultas preparadas.'],
    [3, 'bi bi-box', 'Contenedores', 'Empaquetado de aplicaciones con Docker y docker compose, tanto para desarrollo como para entrega.'],
    [4, 'bi bi-diagram-3', 'Fundamentos de Kubernetes', 'Manifiestos, services e ingress para llevar una aplicación en contenedores a un clúster.'],
    [5, 'bi bi-window', 'Frontend con Next.js', 'Interfaces en React renderizadas en el servidor y conectadas a mis propias APIs.'],
    [6, 'bi bi-file-earmark-text', 'Documentación técnica', 'READMEs, diagramas e informes que explican cómo ejecutar y extender un proyecto.'],
];
$stmt = $pdo->prepare('INSERT INTO services (sort_order, icon, title, description) VALUES (?, ?, ?, ?)');
foreach ($services as $row) {
    $stmt->execute($row);
}

$portfolio = [
    [1, 'Angular', 'Cinelatino', 'Portada de streaming de cine latinoamericano: perfiles, tráileres y 68 películas.', 'assets/img/portfolio/cinelatino-2.jpg', null],
    [2, 'Angular', 'Cinelatino: perfiles', 'Selección de perfil con un perfil Niños que filtra el catálogo por edad.', 'assets/img/portfolio/cinelatino-1.jpg', null],
    [3, 'Angular', 'Framenotes', 'Revisión y aprobación de video con comentarios anclados a cada cuadro.', 'assets/img/portfolio/framenotes-1.jpg', null],
    [4, 'Angular', 'Este portafolio', 'La versión en Angular de este sitio, consumiendo la API del MVC en PHP.', 'assets/img/portfolio/portfolio-1.jpg', 'https://github.com/TantiE100/mvc-portfolio-angular'],
    [5, 'Angular', 'Este portafolio: currículum', 'Formación y experiencia leídas desde PostgreSQL.', 'assets/img/portfolio/portfolio-2.jpg', 'https://github.com/TantiE100/mvc-portfolio-angular'],
    [6, 'PHP MVC', 'Wara Bolivia', 'App de turismo en Bolivia: todo el texto y las imágenes salen de la base de datos.', 'assets/img/portfolio/turismo-1.jpg', null],
    [7, 'PHP MVC', 'Wara Bolivia: destinos', 'Destinos y contadores alimentados desde PostgreSQL.', 'assets/img/portfolio/turismo-2.jpg', null],
    [8, 'PHP MVC', 'Wara Bolivia: tours', 'Paquetes turísticos con precio, duración y lo que incluyen.', 'assets/img/portfolio/turismo-3.jpg', null],
    [9, 'PHP MVC', 'Diario Digital UNIFRANZ', 'Landing de noticias con carrusel de carreras destacadas.', 'assets/img/portfolio/blog-1.jpg', null],
    [10, 'PHP MVC', 'Diario Digital: destacados', 'Artículos de la semana servidos desde PostgreSQL.', 'assets/img/portfolio/blog-2.jpg', null],
    [11, 'PHP MVC', 'Plantilla MVC', 'Primer ejercicio de MVC en PHP sobre la plantilla Carousel de Bootstrap.', 'assets/img/portfolio/template-1.jpg', null],
];
$stmt = $pdo->prepare('INSERT INTO portfolio_items (sort_order, category, title, description, image_path, details_url) VALUES (?, ?, ?, ?, ?, ?)');
foreach ($portfolio as $row) {
    $stmt->execute($row);
}

$pdo->commit();

echo "Datos del portafolio cargados.\n";
