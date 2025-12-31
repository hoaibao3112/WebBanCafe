-- Manual seed data for initial setup
-- Run this in MySQL directly

-- Insert Roles
INSERT IGNORE INTO role (id, name) VALUES (1, 'ADMIN'), (2, 'STAFF');

-- Insert Admin Staff 
-- Check your actual staff table structure first!
INSERT IGNORE INTO staff (no, name, gender, phone, email, address, hourly_wage, deleted) 
VALUES ('ST001', 'Admin User', 1, '0123456789', 'admin@cafe.com', 'Head Office', 50000, 0);

-- Insert Admin Account
-- Password 'admin123' will need to be hashed with bcrypt
-- Run this after checking staff ID
INSERT IGNORE INTO account (username, password, staff_id, role_id)
VALUES ('admin', '$2a$10$YourHashedPasswordHere', 1, 1);

-- Insert Modules
INSERT IGNORE INTO module (id, name) VALUES 
(1, 'dashboard'),
(2, 'staff'),
(3, 'accounts'),
(4, 'products'),
(5, 'materials'),
(6, 'warehouse'),
(7, 'receipts'),
(8, 'promotions');

-- Insert Functions
INSERT IGNORE INTO function (id, name) VALUES 
(1, 'view'),
(2, 'add'),
(3, 'edit'),
(4, 'remove');
