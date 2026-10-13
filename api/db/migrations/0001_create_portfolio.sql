CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    headline TEXT NOT NULL,
    typed_roles TEXT NOT NULL,
    about_intro TEXT NOT NULL,
    about_summary TEXT NOT NULL,
    about_extra TEXT NOT NULL,
    birthday TEXT,
    website TEXT,
    phone TEXT,
    city TEXT,
    age INTEGER,
    degree TEXT,
    email TEXT,
    freelance TEXT,
    address TEXT,
    avatar_path TEXT,
    hero_path TEXT
);

CREATE TABLE social_links (
    id SERIAL PRIMARY KEY,
    sort_order INTEGER NOT NULL DEFAULT 0,
    css_class TEXT NOT NULL,
    icon TEXT NOT NULL,
    url TEXT NOT NULL
);

CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    sort_order INTEGER NOT NULL DEFAULT 0,
    icon TEXT NOT NULL,
    value INTEGER NOT NULL,
    label TEXT NOT NULL,
    caption TEXT
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    sort_order INTEGER NOT NULL DEFAULT 0,
    name TEXT NOT NULL,
    percent INTEGER NOT NULL CHECK (percent BETWEEN 0 AND 100)
);

CREATE TABLE resume_items (
    id SERIAL PRIMARY KEY,
    kind TEXT NOT NULL CHECK (kind IN ('education', 'experience')),
    sort_order INTEGER NOT NULL DEFAULT 0,
    title TEXT NOT NULL,
    period TEXT,
    place TEXT,
    body TEXT,
    bullets TEXT[]
);

CREATE TABLE portfolio_items (
    id SERIAL PRIMARY KEY,
    sort_order INTEGER NOT NULL DEFAULT 0,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_path TEXT NOT NULL,
    details_url TEXT
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    sort_order INTEGER NOT NULL DEFAULT 0,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
