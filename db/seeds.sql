INSERT INTO department(name)
VALUES
("Executive"),

("Finance"),
("Human Recources"),
("Research and Development");

INSERT INTO roles(title, salary, department_id)
VALUES
("Owner", 200.000, 001),
("Finance Manager", 175.000, 002),
("Finance Expert", 125.000, 002),
("HR Manager", 165.000, 003),
("HR Expert", 100.000, 003),
("R+D Manager", 180.000, 004),
("R+D Expert", 155.000, 004);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("Master", "Yoda", 1, NULL),
("Qui-Gon", "Jinn", 2, 1),
("Obi-Wan", "Kenobi", 3, 2),
("Anakin","Skywalker", 4, 1),
("Ahsoka", "Tano", 5, 4);
