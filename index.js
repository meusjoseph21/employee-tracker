const inquirer = require("inquirer")
const mysql = require("mysql")
require("console.table")

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


//create questions
function initQuestions(){
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "start",
            choices: ["view all employees", "view all departments", "view all roles", "add employee", "add department", "exit"]
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
            case "exit": console.log("Goodbye")
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
                name: "roleID"
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


//initialize
initQuestions()