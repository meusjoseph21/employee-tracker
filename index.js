const inquirer = require("inquirer")
const mysql = require("mysql")
require("console.table")
var figlet = require('figlet');

//sql connection
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employeesDB"
  });

  figlet('Employee Manager', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log("\n============================")
    console.log(data)
    console.log("\n============================\n\n\n\n\n\n")
});



//create questions
function initQuestions(){

   
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "start",
            choices: ["view all employees", "view all departments", "view all roles", "add employee", "add department", "add role", "update role", "delete employee", "exit"]
        }
    ).then(function(response){
        console.log(response)
        switch(response.start){
            case "view all employees" : allEmployees()
                break
            case "view all departments": departments()
                break
            case "view all roles": roles()
                break
            case "add employee": addEmployee()
                break
            case "add department": addDepartment()
                break
            case "add role": addRole()
                break
            case "update role": updateRole()
                break
            case "delete employee": deleteEmployee()
                break
            case "exit": stop()
                break
        }
    })
}

function allEmployees(){

    console.log("Selecting all employees...\n");
     connection.query("SELECT employees.id, employees.first_name, employees.last_name, role.title, manager.first_name AS manager, role.salary, department.name AS Department FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees manager ON manager.id = employees.manager_id", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    initQuestions();
  });

}

function departments(){
   connection.query("SELECT department.name AS departments FROM department", function (err, res){
       if (err) throw (err);
       console.table(res)

        initQuestions()
   })

}

function roles(){
    connection.query("SELECT role.title AS Roles FROM role", function (err, res){
        if (err) throw (err);
        console.table(res)
 
         initQuestions()
    })

}

function addEmployee(){
    inquirer.prompt([
        
            {
                type: "input",
                message: "Please enter a first name",
                name: "first_name"
              },
              {
                type: "input",
                message: "Please enter a last name",
                name: "last_name"
              },
              {
                type: "number",
                message: "Please select your role number",
                name: "roleID",
             
              },
              {
                type: "number",
                message: "Please enter your managers ID",
                name: "managerID"
              }
    
    ]).then(function(response){
        console.log("adding a new employee...\n");
    connection.query("INSERT INTO employees SET ?",
    {
      first_name: response.first_name,
      last_name: response.last_name,
      role_id: response.roleID,
      manager_id: response.managerID
    },
    function(err, res) {
      if (err) throw err;
      console.log(`${response.first_name} ${response.last_name} added.`);
      // Call updateProduct AFTER the INSERT completes
      initQuestions();
    }
  );

    })
    
}

function addDepartment(){
    inquirer.prompt(
        {
            type: "input",
            message: "Enter a Department Name: ",
            name: "department"
        }
    ).then(function(response){
        console.log("adding a new department...\n")
        connection.query("INSERT INTO department SET ?", 
        {
            name: response.department
        }, function(err, response){
            if (err) throw (err);
            
            console.log("added")
            initQuestions()
        })
        
    }) 
   

}

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of this position?",
            name: "title"
        },
        {
            type: "number",
            message: "What is the salary of this position?",
            name: "salary"
        },
        {
            type: "number",
            message: "What is the department ID for this position?",
            name: "department_id"
        }
    ]).then(function(response){
        console.log("adding a new role..,\n")
        connection.query("INSERT INTO role SET ?", 
        {
            title: response.title,
            salary: response.salary,
            department_id: response.department_id
        }, function(err, res){
            if (err) throw (err);
            console.log(`${response.title} added`)
            initQuestions()
        })
    })
}

function updateRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the Employee?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the last name of the Employee?",
            name: "last_name"
        },
        {
            type: "number",
            message: "What role ID would you like to give this employee?",
            name: "role_id"
        }
    ]).then(function(response){
        connection.query("UPDATE employees SET role_id = " + response.role_id + " WHERE first_name = '" + response.first_name + "' and last_name = '" + response.last_name + "'", function(err, res){
            if (err) throw (err)
            console.log(`${response.first_name}'s role has been updated.`)
            initQuestions()
        })
    })

}

function deleteEmployee(){
    console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "Strawberry"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function stop(){
    console.log("Goodbye!")
    connection.end()
}

//initialize
initQuestions()