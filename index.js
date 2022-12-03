const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  console.log(`Connected to the database.`)
);

function init() {
  function opener() {
    inquirer
      .prompt([
        {
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
        },
      ])
      .then((response) => {
        console.log(response);
        if (response.opener === "View all employees") {
          viewEmployees();
        } else if (response.opener === "Add an employee") {
          addEmployees();
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
          console.log(`See ya`);
        }
      });
  }
  function viewEmployees() {
    db.query(``);
  }

  function addEmployees() {
    db.query(``);
  }

  function updateRole() {
    db.query(``);
  }

  function viewRoles() {
    db.query(`SHOW * FROM roles;`, (err, table) => {
      if (err) {
        console.error(err);
      } else console.log(table);
    });
  }

  function addRole() {
    db.query(``);
  }

  function viewDepartments() {
    db.query(`SHOW * FROM departments;`, (err, table) => {
      if (err) {
        console.error(err);
      } else console.log(table);
    });
  }

  function addDepartment() {
    db.query(``);
  }

  opener();
}

init();
