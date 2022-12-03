INSERT INTO department(id, name)
VALUES
(001, "Executive"),
(002, "Finance"),
(003, "Human Recources"),
(004, "Research and Development");

INSERT INTO role(id, title, salary, department_id)
VALUES
(001, "Owner", 200,000, 001),
(002, "Finance Manager", 175.000, 002),
(003, "Finance Expert", 125.000, 002),
(004, "HR Manager", 165.000, 003),
(005, "HR Expert", 100,000, 003),
(006, "R+D Manager", 180.000, 004),
(007, "R+D Expert", 155.000, 004);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)