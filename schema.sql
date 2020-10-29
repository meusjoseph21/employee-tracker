/* Create DB ============================================ */

DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;
/*============================================ */



/* department table ================================*/
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
/*============================================ */

/* role table with FK linking department*/
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary VARCHAR(30) NOT NULL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);
/*============================================ */

/* employee table with FK linking role */
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);
/*============================================ */


/* SEED DATA ============================================ */
INSERT INTO department (name)
VALUES ("Human Resources"),("Legal"),("Sales"),("Customer Service"),("Manager")

INSERT INTO role (title, salary, department_id)
VALUES 
("HR Representative", 80000, 1),
("Lawyer", 150000, 2),
("Sales Representative", 75000, 3),
("Customer Service Rep", 52000, 4),
("Manager", 95000, 5)


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Carl", "Fartsalot", 5, NULL),
("Joe", "Buck", 1, 1),
("Katie", "Winslot", 3, 1),
("Connor", "McGregor", 4,1),
/* SEED DATA ============================================ */
