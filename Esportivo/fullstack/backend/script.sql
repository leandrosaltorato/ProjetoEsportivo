DROP DATABASE esportivo;
CREATE DATABASE esportivo;

USE esportivo;

CREATE TABLE alunos (
    id_aluno INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    turma VARCHAR(14)
);


CREATE TABLE equipamentos (
    id_equipamento INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    categoria VARCHAR(100),
    quantidade INTEGER(10)
);


CREATE TABLE locacoes (
    id_loc INTEGER AUTO_INCREMENT PRIMARY KEY,
    id_aluno INTEGER,
    id_equipamento INTEGER,
    data_locacao DATE,
    data_devolucao DATE,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
    FOREIGN KEY (id_equipamento) REFERENCES equipamentos(id_equipamento)
);


INSERT INTO alunos VALUES (DEFAULT, "Carlos", "2A");
INSERT INTO alunos VALUES (DEFAULT, "Antonio", "2B");

INSERT INTO equipamentos VALUES (DEFAULT, "Bola Penalty", "Bolas", 6);
INSERT INTO equipamentos VALUES (DEFAULT, "Rede de Volei", "Redes", 3);

INSERT INTO locacoes VALUES (DEFAULT, 1, 2, "2025-11-06" , "2025-11-27");
INSERT INTO locacoes VALUES (DEFAULT, 2, 1,"2025-11-09" , "2025-11-20");




SELECT categoria, COUNT(*) AS total
FROM equipamentos e
JOIN locacoes l ON l.id_equipamento = e.id_equipamento
GROUP BY categoria;

SELECT nome, COUNT(*) AS total
FROM alunos a
JOIN locacoes l ON l.id_aluno = a.id_aluno
GROUP BY nome;

SELECT nome, COUNT(*) AS total
FROM equipamentos e
JOIN locacoes l ON l.id_equipamento = e.id_equipamento
GROUP BY nome;



