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
  // Show employee ids, first names, last names, job titles, departments (by name?), salaries, manager (by name?)
  db.query(``, (err, table) => {
    if (err) {
      console.error(err);
    } else console.table(table);
    goBack();
  });
}

function addEmployee() {
  // Input employee’s first name, last name, role (by name?), manager (by name?)
  db.query(``, (err, table) => {
    if (err) {
      console.error(err);
    } else console.log(`Added employee`);
    goBack();
  });
}

function updateRole() {
  // Choose employee, change role to selected
  db.query(``, (err, table) => {
    if (err) {
      console.error(err);
    } else console.log(`Updated employee's role`);
    goBack();
  });
}

function viewRoles() {
  // Show role id, name, salary, department (by name?)
  db.query(`SELECT * FROM roles;`, (err, table) => {
    if (err) {
      console.error(err);
    } else console.table(table);
    goBack();
  });
}

function addRole() {
  // Input role name, salary, department it belongs to
  db.query(``, (err, table) => {
    if (err) {
      console.error(err);
    } else console.log(`Role added`);
    goBack();
  });
}

function viewDepartments() {
  // Show department table
  db.query(`SELECT * FROM departments;`, (err, table) => {
    if (err) {
      console.error(err);
    } else console.table(table);
    goBack();
  });
}

function addDepartment() {
  // Input department name
  db.query(``, (err, table) => {
    if (err) {
      console.error(err);
    } else console.log(`Department added`);
    goBack();
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
