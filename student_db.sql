-- ============================================
-- Database: student_mgmt
-- Purpose : Student Directory & Registration
-- Engine  : MySQL 8+
-- ============================================

--
DROP DATABASE IF EXISTS oosd_webappdev;
CREATE DATABASE oosd_webappdev;
  
USE oosd_webappdev;

-- ============================================
-- Table: students
-- ============================================
CREATE TABLE students (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  first_name        VARCHAR(100) NOT NULL,
  last_name         VARCHAR(100) NOT NULL,
  email             VARCHAR(255) NOT NULL UNIQUE,
  phone             VARCHAR(30),

  street_address    VARCHAR(255) NOT NULL,
  city              VARCHAR(100) NOT NULL,
  province_state    VARCHAR(100) NOT NULL,
  country           VARCHAR(100) NOT NULL,
  postal_code       VARCHAR(12)  NOT NULL,

  program           VARCHAR(120) NOT NULL,
  year              VARCHAR(20)  NOT NULL,
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;


-- ============================================
-- Seed Data
-- ============================================
INSERT INTO students
(first_name, last_name, email, phone, street_address, city, province_state, country, postal_code, program, year)
VALUES
('Ava',      'Patel',     'ava.patel@example.com',       '403-555-0101', '123 7 Ave SW',          'Calgary',    'Alberta',        'Canada', 'T2P 0W4', 'Software Development', 'Y2'),
('Liam',     'Nguyen',    'liam.nguyen@example.com',     '587-555-0102', '456 King St W',         'Toronto',    'Ontario',        'Canada', 'M5V 1L7', 'Computer Science',     'Y1'),
('Sofia',    'Martin',    'sofia.martin@example.com',    '604-555-0103', '789 Granville St',      'Vancouver',  'British Columbia','Canada', 'V6Z 1E6', 'Data Analytics',       'Y3'),
('Noah',     'Dubois',    'noah.dubois@example.com',     '514-555-0104', '12 Rue Sainte-Catherine','Montréal',  'Québec',         'Canada', 'H3B 1A7', 'Cybersecurity',        'Y2'),
('Emily',    'Wong',      'emily.wong@example.com',      '780-555-0105', '85 Jasper Ave',         'Edmonton',   'Alberta',        'Canada', 'T5J 1S8', 'UX Design',            'Y1'),
('Mateo',    'Garcia',    'mateo.garcia@example.com',    '613-555-0106', '99 Wellington St',      'Ottawa',     'Ontario',        'Canada', 'K1A 0A9', 'AI & ML',              'Y4'),
('Isabella', 'Khan',      'isabella.khan@example.com',   '431-555-0107', '200 Portage Ave',       'Winnipeg',   'Manitoba',       'Canada', 'R3C 0B3', 'Cloud Computing',      'Y2'),
('Jackson',  'Smith',     'jackson.smith@example.com',   '902-555-0108', '1501 Barrington St',    'Halifax',    'Nova Scotia',    'Canada', 'B3J 1Z6', 'Web Development',      'Y3');

-- Verify
SELECT id, first_name, last_name, email, city, postal_code, program, year
FROM students
ORDER BY created_at DESC;
