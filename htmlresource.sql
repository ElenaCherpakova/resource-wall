SELECT * FROM resources WHERE title ILIKE $1

SELECT resources.*, categories.name AS category_type, count(likes.*) AS like
FROM resources
RIGHT JOIN categories_resources ON resources.id = resource_id
LEFT JOIN categories ON categories.id = category_id
LEFT JOIN likes ON likes.resource_id = resources.id
LEFT JOIN ratings ON ratings.resource_id = resources.id
GROUP BY resources.id, categories.name
HAVING title LIKE '%Light%'
ORDER BY resources.created_at DESC
