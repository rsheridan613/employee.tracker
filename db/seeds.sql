INSERT INTO department(name)
VALUES
("Executive"),
("Finance"),
("Human Recources"),
("Research and Development");

INSERT INTO role(title, salary, department_id)
VALUES
("Owner", 200000, 001),
("Finance Manager", 175000, 002),
("Finance Expert", 125000, 002),
("HR Manager", 165000, 003),
("HR Expert", 100000, 003),
("R+D Manager", 180000, 004),
("R+D Expert", 155000, 004);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
("Master", "Yoda", 1, NULL),
("Qui-Gon", "Jinn", 2, 1),
("Obi-Wan", "Kenobi", 3, 2),
("Anakin","Skywalker", 4, 1),
("Ahsoka", "Tano", 5, 4),
("Luminara", "Unduli", 6, 1),
("Barriss", "Offee", 7, 4);
