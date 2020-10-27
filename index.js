const inquirer = require("inquirer")
const mysql = require("mysql")

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
     connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });

}

function departments(){

}

function manager(){

}



//initialize
initQuestions()