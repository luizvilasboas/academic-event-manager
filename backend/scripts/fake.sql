-- Adicionar usuários
INSERT INTO users (name, email, password, is_admin) VALUES 
('João da Silva', 'joao.silva@example.com', '$2y$10$abcdefghi1234567890abcdefgHiJklmnopqrstuVwxyz1234567890abc', FALSE),
('Maria de Souza', 'maria.souza@example.com', '$2y$10$abcdefghi1234567890abcdefgHiJklmnopqrstuVwxyz1234567890abc', FALSE),
('Pedro Almeida', 'pedro.almeida@example.com', '$2y$10$abcdefghi1234567890abcdefgHiJklmnopqrstuVwxyz1234567890abc', FALSE),
('Ana Costa', 'ana.costa@example.com', '$2y$10$abcdefghi1234567890abcdefgHiJklmnopqrstuVwxyz1234567890abc', FALSE),
('Lucas Pereira', 'lucas.pereira@example.com', '$2y$10$abcdefghi1234567890abcdefgHiJklmnopqrstuVwxyz1234567890abc', FALSE);

-- Adicionar eventos
INSERT INTO events (name, description, start_date, end_date) VALUES 
('Semana de Tecnologia', 'Evento com diversas palestras e workshops sobre tecnologia.', '2023-09-01', '2023-09-05'),
('Semana de Ciências', 'Evento com palestras e cursos sobre ciências naturais.', '2023-10-10', '2023-10-15');

-- Adicionar cursos
INSERT INTO courses (event_id, title, description, start_time, end_time) VALUES 
(1, 'Introdução ao Machine Learning', 'Curso básico sobre técnicas de Machine Learning.', '2023-09-02 09:00:00', '2023-09-02 12:00:00'),
(1, 'Desenvolvimento Web com Node.js', 'Curso avançado de desenvolvimento web usando Node.js.', '2023-09-03 14:00:00', '2023-09-03 17:00:00'),
(1, 'Banco de Dados NoSQL', 'Curso sobre bancos de dados NoSQL.', '2023-09-04 10:00:00', '2023-09-04 13:00:00'),
(2, 'Biotecnologia Avançada', 'Curso sobre avanços recentes em biotecnologia.', '2023-10-11 09:00:00', '2023-10-11 12:00:00'),
(2, 'Química Orgânica', 'Curso de introdução à química orgânica.', '2023-10-12 14:00:00', '2023-10-12 17:00:00'),
(2, 'Física Quântica', 'Curso avançado sobre princípios da física quântica.', '2023-10-13 10:00:00', '2023-10-13 13:00:00');

-- Adicionar inscrições
INSERT INTO registrations (student_id, course_id) VALUES 
(1, 1),  -- João da Silva no curso de Introdução ao Machine Learning
(1, 2),  -- João da Silva no curso de Desenvolvimento Web com Node.js
(2, 3),  -- Maria de Souza no curso de Banco de Dados NoSQL
(2, 4),  -- Maria de Souza no curso de Biotecnologia Avançada
(3, 5),  -- Pedro Almeida no curso de Química Orgânica
(3, 6),  -- Pedro Almeida no curso de Física Quântica
(4, 1),  -- Ana Costa no curso de Introdução ao Machine Learning
(4, 5),  -- Ana Costa no curso de Química Orgânica
(5, 2),  -- Lucas Pereira no curso de Desenvolvimento Web com Node.js
(5, 6);  -- Lucas Pereira no curso de Física Quântica

-- Adicionar pontuações
INSERT INTO scores (student_id, points) VALUES 
(1, 20),  -- João da Silva com 20 pontos
(2, 20),  -- Maria de Souza com 20 pontos
(3, 20),  -- Pedro Almeida com 20 pontos
(4, 20),  -- Ana Costa com 20 pontos
(5, 20);  -- Lucas Pereira com 20 pontos
