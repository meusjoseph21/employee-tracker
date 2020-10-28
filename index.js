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
            choices: ["view all employees", "view all employees by department", "view all employees by manager"]
        }
    ).then(function(response){
        console.log(response)
        switch(response.start){
            case "view all employees" : allEmployees()
                break
            case "view all employees by department": departments()
                break
            case "view all employees by manager": manager()
                break
            default: postItem()
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
    inquirer.prompt(
        {
            type: "list",
            message: 'Which department would you like to view',
            name: 'department',
            choices: ["Human Resources", "Sales", "Customer Service" ]

        }
    ).then(function(response){
        console.log(response)
        console.log(`Selecting employees from ${response.department} department...`)
    })

}

function manager(){

}



//initialize
initQuestions()