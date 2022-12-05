const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the database.`)
);

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "opener",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add an employee",
        "Update employee role",
        "View all roles",
        "Add a role",
        "View all departments",
        "Add a department",
        "Exit",
      ],
    })
    .then((response) => {
      // console.log(response);
      if (response.opener === "View all employees") {
        viewEmployees();
      } else if (response.opener === "Add an employee") {
        addEmployee();
      } else if (response.opener === "Update employee role") {
        updateRole();
      } else if (response.opener === "View all roles") {
        viewRoles();
      } else if (response.opener === "Add a role") {
        addRole();
      } else if (response.opener === "View all departments") {
        viewDepartments();
      } else if (response.opener === "Add a department") {
        addDepartment();
      } else if (response.opener === "Exit") {
        exitApp();
      }
    });
}

function viewEmployees() {
  // Show employee ids, first names, last names, role, departments (by name?), salaries, manager (by name?)
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, manager_id.first_name AS Manager
    FROM employee
    JOIN role ON employee.role_id = roles.id
    JOIN department ON role.department_id = department.id
    JOIN employee manager_id ON manager_id.id = employee.manager_id;`,
    (err, table) => {
      if (err) {
        console.error(err);
      } else console.table(table);
      goBack();
    }
  );
}

function addEmployee() {
  // Input employee’s first name, last name, role id, manager id
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the ID for the employee's role?",
      },
      {
        type: "input",
        name: "manager",
        message: "What is the ID for this person's manager?",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES ("${response.firstName}", "${response.lastName}", ${response.role}, ${response.manager})`,
        (err, table) => {
          if (err) {
            console.error(err);
          } else console.log(`Added  ${response.firstName} to employee table`);
          goBack();
        }
      );
    });
}

function updateRole() {
  // Choose employee, change role to selected
  var employees = db.query(`SELECT first_name, id FROM employee;`)(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name }) => ({
      name: first_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          choices: employeeChoices,
          message: "Which employee would you like to update?",
          name: "pickedEmployee",
        },
      ])
      .then((response) => {
        db.query(`SELECT title, id FROM roles`).then(([rows]) => {
          let titles = rows;
          const titleChoices = titles.map(({ id, title }) => ({
            role: title,
            value: id,
          }));
          inquirer
            .prompt({
              type: "list",
              choices: titleChoices,
              message: "Which role would you like to give them?",
              name: "pickedRole",
            })
            .then((choices) => {
              db.query(
                `UPDATE employees SET role_id = ${choices.pickedRole} WHERE id = ${response.pickedEmployee} `
              );
            });
        });
      });
  });

  db.query(``, (err, table) => {
    if (err) {
      console.error(err);
    } else console.log(`Updated employee's role`);
    goBack();
  });
}

function viewRoles() {
  // Show role id, name, salary, department (by name?)
  db.query(
    `SELECT role.id, title, salary, department.name AS department FROM role
    JOIN department ON role.department_id = department.id;`,
    (err, table) => {
      if (err) {
        console.error(err);
      } else console.table(table);
      goBack();
    }
  );
}

function addRole() {
  // Input role name, salary, department it belongs to
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is this role called?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this possition?",
      },
      {
        type: "input",
        name: "department",
        message: "What department ID does this role belong to?",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO role(title, salary, department_id) 
        VALUES ("${response.role}", ${response.salary}, ${response.department});`,
        (err, table) => {
          if (err) {
            console.error(err);
          } else console.log(`${response.role} added to role table`);
          goBack();
        }
      );
    });
}

function viewDepartments() {
  // Show department table
  db.query(`SELECT * FROM department;`, (err, table) => {
    if (err) {
      console.error(err);
    } else console.table(table);
    goBack();
  });
}

function addDepartment() {
  // Input department name
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the department called?",
    })
    .then((response) => {
      db.query(
        `INSERT INTO department(name) VALUES ("${response.department}")`,
        (err, table) => {
          if (err) {
            console.error(err);
          } else
            console.log(`${response.department} added to department table`);
          goBack();
        }
      );
    });
}

function goBack() {
  // Ask after each prompt, to return to main question or exit
  inquirer
    .prompt({
      type: "list",
      name: "goBack",
      message: "What would you like to do?",
      choices: ["See something else", "Exit"],
    })
    .then((response) => {
      // Return to opener prompt if requested
      if (response.goBack === "See something else") {
        init();
      } else exitApp();
    });
}

function exitApp() {
  console.log(`See ya`);
}

init();
