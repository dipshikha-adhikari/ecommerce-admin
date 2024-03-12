CREATE TABLE IF NOT EXISTS staff_accounts (
  id SERIAL PRIMARY KEY,
  role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
  fullname VARCHAR(100) NOT NULL,
  phone_number VARCHAR(100) DEFAULT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  image TEXT DEFAULT NULL,
  placeholder TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by INTEGER REFERENCES staff_accounts(id),
  updated_by INTEGER REFERENCES staff_accounts(id)
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(75),
    email VARCHAR(75) UNIQUE,
    password_hash TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id INTEGER REFERENCES categories(id),
     created_by INTEGER REFERENCES staff_accounts(id)
);

CREATE TABLE category_relations (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    parent_category_id INTEGER REFERENCES categories(id)
);


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE featured_products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_id INT NOT NULL REFERENCES images(id),
    category_id INT NOT NULL REFERENCES categories(id),
    created_by INT NOT NULL REFERENCES staff_accounts(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    public_id VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by INT REFERENCES staff_accounts(id)
);

CREATE TABLE product_images (
    product_id INT REFERENCES products(id),
    image_id INT REFERENCES images(id),
    PRIMARY KEY (product_id, image_id),
    created_by INT REFERENCES staff_accounts(id)
);


INSERT INTO product_images (product_id, image_id) VALUES
(1, 1),  -- Associate image 1 with product 1
(1, 2),  -- Associate image 2 with product 1
(2, 2),  -- Associate image 2 with product 2
(3, 3);  -- Associate image 3 with product 3

INSERT INTO categories (name, parent_id) VALUES
('Men', NULL),
('Women', NULL),
('Children', NULL),
('Clothes', 1),   -- Men's Clothing
('Watches', 1),
('Shoes', 1),
('Shirts', 4),    -- Men's Shirts
('Pants', 4),
('Dresses', 2),   -- Women's Dresses
('Skirts', 2),
('Jeans', 3),     -- Children's Jeans
('Tops', 3);


-- select categories 
 WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id
  FROM categories
  WHERE parent_id IS NULL

  UNION ALL

  SELECT c.id, c.name, c.parent_id
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT c.id AS parent_id,
       c.name AS parent_name,
       COALESCE(json_agg(sub), '[]'::json) AS childrens
--        json_agg is an aggregate function in PostgreSQL that aggregates values into a JSON array.
-- In this case, json_agg(sub) aggregates the child categories (sub) into a JSON array. Each element of the JSON array represents a child category, with properties like id and name.
-- COALESCE(..., '[]'::json):

-- The COALESCE function returns the first non-null value among its arguments.
-- If json_agg(sub) returns null (i.e., if there are no child categories for a parent category), COALESCE replaces it with an empty JSON array ('[]'::json).

FROM category_tree c
LEFT JOIN LATERAL (
  SELECT sub.id, sub.name, COALESCE(json_agg(grandchild), '[]'::json) AS childrens
  FROM categories sub
  LEFT JOIN LATERAL (
    SELECT grandchild.id, grandchild.name
    FROM categories grandchild
    WHERE grandchild.parent_id = sub.id
  ) AS grandchild ON true
  WHERE sub.parent_id = c.id
  GROUP BY sub.id, sub.name
) AS sub ON true
LEFT JOIN LATERAL (
  SELECT COUNT(*) > 0 AS has_children
  FROM categories sub2
  WHERE sub2.parent_id = c.id
) AS has_children ON true
WHERE c.parent_id IS NULL
GROUP BY c.id, c.name
HAVING json_agg(sub) IS NOT NULL;

-- Find all the contraint 
SELECT conname, pg_get_constraintdef(oid) AS constraint_def
FROM pg_constraint
WHERE conrelid = 'products'::regclass;

