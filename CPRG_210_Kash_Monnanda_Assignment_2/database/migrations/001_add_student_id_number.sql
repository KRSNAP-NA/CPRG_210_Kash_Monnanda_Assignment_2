ALTER TABLE students
  ADD COLUMN id_number VARCHAR(9) NULL,
  ADD UNIQUE KEY uq_students_id_number (id_number);
