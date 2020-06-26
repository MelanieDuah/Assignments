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

}

module.exports = EmployeeBusiness;