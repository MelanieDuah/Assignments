const mysql = require('mysql2/promise');
const Department = require('../dataentities/department');
const Role = require('../dataentities/role');
const Employee = require('../dataentities/employee');



class EmployeeDataAccess {

    constructor() {
        this.initializeConnection();
    }

    async initializeConnection() {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_tracker'
        });
    }

    saveRole(role) {
        return new Promise(async (resolve, reject) => {
            let query = `INSERT INTO role (title,salary,department_id) VALUES (\"${role.getName()}\",\"${role.getSalary()}\",\"${role.department.getId()}\")`;

            await this.connection.query(query);
            resolve();
        });
    }

    saveEmployee(employee) {
        return new Promise(async (resolve, reject) => {

            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (\"${employee.getFirstName()}\",\"${employee.getLastName()}\",\"${employee.getRole().getId()}\",\"${employee.getManager().getId()}\")`;

            await this.connection.query(query);

            resolve();
        });
    }

    saveDepartment(departmentName) {
        return new Promise(async (resolve, reject) => {

            let query = `INSERT INTO department (name) VALUES (\"${departmentName}\")`;

            await this.connection.query(query);

            resolve();
        });
    }

    getAllDepartments() {
        return new Promise(async (resolve, reject) => {

            let query = `SELECT * FROM department`;
            const [results] = await this.connection.query(query);

            let departments = [];

            for (let i = 0; i < results.length; i++) {
                let department = new Department(results[i].id, results[i].name);
                departments.push(department);
            }
            resolve(departments);

        });
    }

    getAllRoles() {
        return new Promise(async (resolve, reject) => {

            let query = `SELECT * FROM role`;

            let [results] = await this.connection.query(query);

            let roles = [];

            for (let i = 0; i < results.length; i++) {
                let role = new Role(results[i].title, results[i].department_id, results[i].salary, results[i].id);
                roles.push(role);
            }
            resolve(roles);
        });
    }

    getRoleById(id) {
        return new Promise(async (resolve, reject) => {

            let query = `SELECT * FROM role WHERE id = ${id}`;

            let [results] = await this.connection.query(query);
            let department = await this.getDepartmentById(results[0].department_id);

            let role = new Role(results[0].title, department, results[0].salary, results[0].id);

            resolve(role);
        });
    }
    
    getDepartmentById(id) {
        return new Promise(async (resolve, reject) => {

            let query = `SELECT * FROM department WHERE id = ${id}`;

            let [results] = await this.connection.query(query);

           let department = new Department(results[0].id, results[0].name);

            resolve(department);
        });
    }

    getEmployeeById(id) {
        return new Promise(async (resolve, reject) => {

            let query = `SELECT * FROM employee WHERE id = ${id}`;

            let [results] = await this.connection.query(query);
            let role = await this.getRoleById(results[0].role_id);
            let employee = new Employee(results[0].id, results[0].first_name, results[0].last_name, role);

            resolve(employee);
        });
    }

    getAllEmployees() {
        return new Promise(async (resolve, reject) => {

            let query = `SELECT * FROM employee`;
            let [results] = await this.connection.query(query);

            let employees = [];

            for (let i = 0; i < results.length; i++) {
                let role = await this.getRoleById(results[i].role_id);

                let manager = null;

                if (results[i].manager_id) {
                    let managerRecord = results.find(result => result.id == results[i].manager_id);
                    manager = new Employee(managerRecord.id, managerRecord.first_name, managerRecord.last_name, role);
                }

                let employee = new Employee(results[i].id, results[i].first_name, results[i].last_name, role, manager);
                employees.push(employee);
            }

            resolve(employees);
        });
    }

    getEmployeesByDepartment(department) {
        return new Promise(async (resolve, reject) => {
            let query = `SELECT employee.id, first_name, last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.id =${department.getId()}`;

            let [results] = await this.connection.query(query);
            let employees = [];

            for (let i = 0; i < results.length; i++) {
                let employee = new Employee(results[i].id, results[i].first_name, results[i].last_name);
                employees.push(employee);
            }

            resolve(employees);
        });
    }
    
    getEmployeesByManager(manager) {
        return new Promise(async (resolve, reject) => {
            let query = `SELECT A.id, A.first_name, A.last_name FROM employee as A JOIN employee as B ON A.manager_id = B.id WHERE A.manager_id =${manager.getId()}`;
            let [results] = await this.connection.query(query);
            let employees = [];

            for (let i = 0; i < results.length; i++) {
                let employee = new Employee(results[i].id, results[i].first_name, results[i].last_name);
                employees.push(employee);
            }

            resolve(employees);
        });
    }
    
    getAllManagers() {
        return new Promise(async (resolve, reject) => {
            let query = `SELECT DISTINCT A.id, A.first_name, A.last_name FROM employee as A JOIN employee as B ON A.id = B.manager_id`;

            let [results] = await this.connection.query(query);
            let employees = [];

            for (let i = 0; i < results.length; i++) {
                let employee = new Employee(results[i].id, results[i].first_name, results[i].last_name);
                employees.push(employee);
            }

            resolve(employees);
        });
    }

    updateEmployeeRole(employee){
        let query = `UPDATE employee SET role_id=${employee.getRole().getId()} WHERE id=${employee.getId()}`;
         this.connection.query(query);
    }
    
    updateEmployeeManager(employee){
        let query = `UPDATE employee SET manager_id=${employee.getManager().getId()} WHERE id=${employee.getId()}`;
         this.connection.query(query);
    }
}

module.exports = EmployeeDataAccess;