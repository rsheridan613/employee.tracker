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
  function opener() {
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
          exitApp();
        }
      });
  }

  function viewEmployees() {
    db.query(``, (err, table) => {
      if (err) {
        console.error(err);
      } else console.table(table);
      goBack();
    });
  }

  function addEmployees() {
    db.query(``, (err, table) => {
      if (err) {
        console.error(err);
      } else console.log(`Added employee`);
      goBack();
    });
  }

  function updateRole() {
    db.query(``, (err, table) => {
      if (err) {
        console.error(err);
      } else console.log(`Updated employee's role`);
      goBack();
    });
  }

  function viewRoles() {
    db.query(`SELECT * FROM roles;`, (err, table) => {
      if (err) {
        console.error(err);
      } else console.table(table);
      goBack();
    });
  }

  function addRole() {
    db.query(``, (err, table) => {
      if (err) {
        console.error(err);
      } else console.log(`Role added`);
      goBack();
    });
  }

  function viewDepartments() {
    db.query(`SELECT * FROM departments;`, (err, table) => {
      if (err) {
        console.error(err);
      } else console.table(table);
      goBack();
    });
  }

  function addDepartment() {
    db.query(``, (err, table) => {
      if (err) {
        console.error(err);
      } else console.log(`Department added`);
      goBack();
    });
  }

  function goBack() {
    inquirer
      .prompt({
        type: "list",
        name: "goBack",
        message: "What would you like to do?",
        choices: ["See something else", "Exit"],
      })
      .then((response) => {
        if (response.goBack === "See something else") {
          opener();
        } else exitApp();
      });
  }

  function exitApp() {
    console.log(`See ya`);
  }

  opener();
}

init();
