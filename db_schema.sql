-- =========================================================================
-- INSIGHTFORGE DATABASE SCHEMA & INTEGRATION SCRIPT
-- Database Compatibility: PostgreSQL 12+ / MySQL 8.0+
-- =========================================================================
-- This script contains the table structures and example queries required to
-- store user credentials (sign-up/login info) and clean, structured sales
-- transactions processed by the InsightForge system.

-- -------------------------------------------------------------------------
-- 1. Table Definitions
-- -------------------------------------------------------------------------

-- Users Table
-- Stores user accounts, emails, and hashed passwords.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Keep hashes secure (Argon2id/bcrypt)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales Data Table
-- Stores sales transactions linked to a specific user.
CREATE TABLE sales_data (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    transaction_id VARCHAR(50) NOT NULL,
    sale_date DATE NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    region VARCHAR(100),
    sales_amount DECIMAL(12, 2) NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 2. Indexes for Performance Optimization
-- -------------------------------------------------------------------------
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sales_user_date ON sales_data(user_id, sale_date);
CREATE INDEX idx_sales_category ON sales_data(category);

-- -------------------------------------------------------------------------
-- 3. Example Queries
-- -------------------------------------------------------------------------

-- A. Registering a new user (Sign Up)
-- Insert details of a new user. Always hash the password on the backend.
INSERT INTO users (name, email, password_hash)
VALUES ('Jane Doe', 'jane.doe@company.com', '$2b$10$e9R12x...[Argon2id/bcrypt hash]...');

-- B. Logging in a user (Sign In)
-- Retrieve password hash by email for validation
SELECT id, name, email, password_hash 
FROM users 
WHERE email = 'jane.doe@company.com';

-- C. Storing sales data for a user
-- Links transaction entries to user_id = 1
INSERT INTO sales_data (user_id, transaction_id, sale_date, product_name, category, region, sales_amount, quantity)
VALUES 
(1, 'TX-10042', '2026-06-12', 'Forge Analytics (Pro)', 'Software', 'Americas', 1950.00, 1),
(1, 'TX-10041', '2026-06-12', 'CSV Optimizer', 'Software', 'EMEA', 890.00, 2),
(1, 'TX-10040', '2026-06-11', 'Predictive Pro', 'Software', 'APAC', 1200.00, 1);

-- D. Aggregating sales data reports for a specific user
-- Sum up total revenue, orders, and units sold
SELECT 
    COUNT(id) AS total_orders,
    SUM(sales_amount) AS total_revenue,
    SUM(quantity) AS total_units_sold,
    AVG(sales_amount) AS average_order_value
FROM sales_data
WHERE user_id = 1;

-- E. Fetching revenue breakdown by category for a user
SELECT 
    category,
    SUM(sales_amount) AS revenue,
    COUNT(id) AS orders
FROM sales_data
WHERE user_id = 1
GROUP BY category
ORDER BY revenue DESC;
