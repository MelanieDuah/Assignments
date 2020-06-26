class Role {
    constructor(name, department, salary, id) {
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.id = id;
    }
    getName() {
        return this.name;
    }

    getDepartment() {
        return this.department;
    }

    getSalary() {
        return this.salary;
    }
    getId(){
        return this.id;
    }
}

module.exports = Role;