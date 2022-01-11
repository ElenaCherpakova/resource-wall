SELECT * FROM resources
ORDER BY created_at DESC
LIMIT 1;


`SELECT categories.name as name FROM categories
JOIN categories_resources ON categories.id = category_id
JOIN resources ON resources.id = resource_id
WHERE resources.id = $1`

SELECT resources.*, categories.name AS category_type
FROM ((resources
INNER JOIN categories_resources ON resources.id = resource_id)
INNER JOIN categories ON categories.id = category_id)
ORDER BY created_at DESC
LIMIT 1;



SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
