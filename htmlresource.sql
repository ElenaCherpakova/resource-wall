SELECT * FROM likes
JOIN resources ON resources.id = resource_id
WHERE likes.user_id = 1;




SELECT likes.*, categories.name AS category_type
FROM (((likes INNER JOIN resources ON resources.id = likes.resource_id)
INNER JOIN categories_resources ON resources.id = resource_id)
INNER JOIN categories ON categories.id = category_id)
WHERE likes.user_id= $1
ORDER BY created_at DESC
LIMIT 1;

SELECT *
FROM likes l
INNER JOIN resources r ON l.resource_id = r.id
INNER JOIN categories_resources cr ON cr.resource_id = r.id
INNER JOIN categories c ON c.id = cr.id
WHERE l.user_id = 1
ORDER BY r.created_at DESC
LIMIT 4;



