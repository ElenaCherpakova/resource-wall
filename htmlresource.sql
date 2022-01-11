SELECT * FROM resources
ORDER BY created_at DESC
LIMIT 1;


`SELECT categories.name as name FROM categories
JOIN categories_resources ON categories.id = category_id
JOIN resources ON resources.id = resource_id
WHERE resources.id = $1`
