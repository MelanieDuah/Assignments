const EmployeeDataAccess = require('../dataaccess/employeeDataAccess');
const Role = require('../dataentities/role');
const Employee = require('../dataentities/employee');

class EmployeeBusiness {

    constructor() {
        this.employeeDataAccess = new EmployeeDataAccess();
    }

    addRole(name, department, salary) {
        let role = new Role(name, department, salary);
        this.employeeDataAccess.saveRole(role);
    }

    addDepartment(departmentName) {
        this.employeeDataAccess.saveDepartment(departmentName);
    }

    addEmployee(firstName, lastName, role, manager) {
        let employee = new Employee(null, firstName, lastName, role, manager);
        this.employeeDataAccess.saveEmployee(employee);
    }

    getAllDepartments() {
        return this.employeeDataAccess.getAllDepartments();
    }

    getAllEmployees() {
        return this.employeeDataAccess.getAllEmployees();
    }

    getAllRoles() {
        return this.employeeDataAccess.getAllRoles();
    }

    getEmployeesByDepartment(department){
        return this.employeeDataAccess.getEmployeesByDepartment(department);
    }
    
    getEmployeesByManager(manager){
        return this.employeeDataAccess.getEmployeesByManager(manager);
    }
    
    getAllManagers(){
        return this.employeeDataAccess.getAllManagers();
    }

    updateEmployeeRole(employee){
        this.employeeDataAccess.updateEmployeeRole(employee);
    }
    
    updateEmployeeManager(employee){
        this.employeeDataAccess.updateEmployeeManager(employee);
    }
}

module.exports = EmployeeBusiness;