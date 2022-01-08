DROP TABLE IF EXISTS categories_resources CASCADE;
CREATE TABLE categories_resources (
    id SERIAL PRIMARY KEY NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    resource_id INTEGER REFERENCES resources(id) ON DELETE CASCADE
);