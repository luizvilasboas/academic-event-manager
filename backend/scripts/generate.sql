-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS academic_event;
USE academic_event;

-- Tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de eventos
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de cursos
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Tabela de inscrições
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(student_id, course_id)
);

-- Tabela de pontuações
CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    points INT DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Trigger para adicionar pontos automaticamente
CREATE TRIGGER add_points_after_registration
AFTER INSERT ON registrations
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM scores WHERE student_id = NEW.student_id) = 0 THEN
        INSERT INTO scores (student_id, points)
        VALUES (NEW.student_id, 10);
    ELSE
        UPDATE scores
        SET points = points + 10
        WHERE student_id = NEW.student_id;
    END IF;
END;

-- Trigger para remover pontos automaticamente
CREATE TRIGGER subtract_points_after_unregistration
AFTER DELETE ON registrations
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM scores WHERE student_id = OLD.student_id) > 0 THEN
        UPDATE scores
        SET points = GREATEST(points - 10, 0)
        WHERE student_id = OLD.student_id;
    END IF;
END;

-- Trigger para adicionar valor inicial no scores
CREATE TRIGGER set_initial_points_after_user_creation
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO scores (student_id, points)
    VALUES (NEW.id, 0);
END;

-- Trigger para prevenir conflitos de horário
CREATE TRIGGER prevent_time_conflict
BEFORE INSERT ON registrations
FOR EACH ROW
BEGIN
    DECLARE conflicting_count INT;
    SELECT COUNT(*) INTO conflicting_count
    FROM registrations r
    JOIN courses c1 ON r.course_id = c1.id
    JOIN courses c2 ON NEW.course_id = c2.id
    WHERE r.student_id = NEW.student_id
    AND c1.start_time < c2.end_time
    AND c1.end_time > c2.start_time;

    IF conflicting_count > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Time conflict detected. Cannot register for this course.';
    END IF;
END;

-- View para ranking de participação
CREATE OR REPLACE VIEW ranking_participation AS
SELECT u.id, u.name, s.points
FROM scores s
JOIN users u ON s.student_id = u.id
ORDER BY s.points DESC;

-- Indices para melhorar a performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_courses_event_id ON courses(event_id);
CREATE INDEX idx_registrations_student_id ON registrations(student_id);
CREATE INDEX idx_registrations_course_id ON registrations(course_id);
