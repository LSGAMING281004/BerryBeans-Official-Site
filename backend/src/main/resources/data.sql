-- Create admin user with password 'admin123'
INSERT INTO users (username, password, role) 
VALUES ('admin', '$2a$10$wY9i1WZhW0t.y.LwR7DMOu3V8P.91Rz0AqyT9Kj8y1TzXN3A9rZ7G', 'ROLE_ADMIN');
-- Add sample projects
INSERT INTO projects (title, description, image_url, technologies) VALUES ('E-commerce Platform', 'A robust scalable online store', 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80', 'React, Spring Boot, MySQL');
-- Add sample jobs
INSERT INTO jobs (title, description, requirements, location, type) VALUES ('Frontend Developer', 'Looking for an experienced React developer', '3+ years React, Redux, Tailwind', 'Remote', 'Full-time');
