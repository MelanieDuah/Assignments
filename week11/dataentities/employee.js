class Employee {
    constructor(id, firstName, lastName, role, manager) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.manager = manager;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getRole() {
        return this.role;
    }

    getManager(){
      return this.manager;
    }

    getId(){
        return this.id;
    }

    getName(){
        return `${this.firstName} ${this.lastName}`;
    }
}

module.exports = Employee;