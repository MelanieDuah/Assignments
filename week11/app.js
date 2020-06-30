const inquirer = require('inquirer');
const questions = require('./presentation/questions');
const EmployeeBusiness = require('./business/employeeBusiness');
const Employee = require('./dataentities/employee');
let business = new EmployeeBusiness();

async function showMainPrompt() {
  let answers = await inquirer.prompt(questions.mainQuestion);

  switch (answers.main) {
    case 'addDepartment':
      promptAddDepartment();
      break;
    case 'addRole':
      promptAddRole();
      break;
    case 'addEmployee':
      promptAddEmployee();
      break;
    case 'viewAllEmployees':
      viewAllEmployees();
      break;
    case 'viewEmployeesByDepartment':
      viewEmployeesByDepartment();
      break;
    case 'viewEmployeesByManager':
      viewEmployeesByManager();
      break;
    case 'updateEmployeeRole':
      updateEmployeeRole();
      break; 
      case 'updateEmployeeManager':
        updateEmployeeManager();
      break;
  }
}

showMainPrompt();

async function promptAddDepartment() {
  let answer = await inquirer.prompt(questions.addDepartmentQuestion);
  business.addDepartment(answer.departmentName);
  showMainPrompt();
}

async function promptAddRole() {
  let departments = await business.getAllDepartments();

  let choices = [];
  for (let department of departments) {
    let choice = {
      name: department.getName(),
      value: department
    }
    choices.push(choice);
  }

  questions.addRoleQuestion[1].choices = choices;

  let answers = await inquirer.prompt(questions.addRoleQuestion);
  business.addRole(answers.roleName, answers.department, answers.salary);

  showMainPrompt();
}

async function promptAddEmployee() {
  //Get roles list to show as options for selecting employee role
  let roles = await business.getAllRoles();

  let choices = [];
  for (let role of roles) {
    let choice = {
      name: role.getName(),
      value: role
    }
    choices.push(choice);
  }

  let rolequestion = 2;
  questions.addEmployeeQuestions[rolequestion].choices = choices;

  //Get employee list to show as options for selecting employee manager
  let employees = await business.getAllEmployees();

  choices = [];
  for (let manager of employees) {
    let choice = {
      name: manager.getName(),
      value: manager
    }
    choices.push(choice);
  }
  if (choices.length > 0) {
    let managerquestion = 3;
    questions.addEmployeeQuestions[managerquestion].choices = choices;
  }

  let answers = await inquirer.prompt(questions.addEmployeeQuestions);
  business.addEmployee(answers.firstName, answers.lastName, answers.role, answers.manager);

  showMainPrompt();
}

async function viewAllEmployees() {

  let employees = await business.getAllEmployees();

  for (let employee of employees) {
    let manager = null;
    if (employee.getManager())
      manager = employee.getManager().getName();
    console.log(` ${employee.getName()}  ${employee.getRole().getDepartment().getName()}  ${employee.getRole().getSalary()}  ${manager}`);
  }
  showMainPrompt();
}

async function viewEmployeesByDepartment() {
  let departments = await business.getAllDepartments();

  let choices = [];
  for (let department of departments) {
    let choice = {
      name: department.getName(),
      value: department
    }
    choices.push(choice);
  }
  
  questions.selectDepartment[0].choices = choices;

  let answer = await inquirer.prompt(questions.selectDepartment);
  let employees = await business.getEmployeesByDepartment(answer.department);

  for (let employee of employees)
    console.log(`${employee.getName()}`);

  showMainPrompt();
}

async function viewEmployeesByManager() {
  let managers = await business.getAllManagers();

  let choices = [];
  for (let manager of managers) {
    let choice = {
      name: manager.getName(),
      value: manager
    }
    choices.push(choice);
  }

  questions.selectManager[0].choices = choices;

  let answer = await inquirer.prompt(questions.selectManager);
  let employees = await business.getEmployeesByManager(answer.manager);

  for (let employee of employees)
    console.log(`${employee.getName()}`);

  showMainPrompt();
}

async function updateEmployeeRole() {
  let employees = await business.getAllEmployees();

  let choices = [];
  for (let employee of employees) {
    let choice = {
      name: employee.getName(),
      value: employee
    }
    choices.push(choice);
  }

  questions.selectEmployee[0].choices = choices;

  let answer = await inquirer.prompt(questions.selectEmployee);
  let employee = answer.employee;

  let roles = await business.getAllRoles();

  choices = [];
  for (let role of roles) {
    let choice = {
      name: role.getName(),
      value: role
    }
    choices.push(choice);
  }
  questions.selectRole[0].choices = choices;

  answer = await inquirer.prompt(questions.selectRole);
  let role = answer.role;

  employee.setRole(role);

  business.updateEmployeeRole(employee);

  showMainPrompt();
}

async function updateEmployeeManager() {
  let employees = await business.getAllEmployees();

  let choices = [];
  for (let employee of employees) {
    let choice = {
      name: employee.getName(),
      value: employee
    }
    choices.push(choice);
  }

  questions.selectEmployee[0].choices = choices;

  let answer = await inquirer.prompt(questions.selectEmployee);
  let employee = answer.employee;

  let managers = await business.getAllManagers();

 choices = [];
  for (let manager of managers) {
    let choice = {
      name: manager.getName(),
      value: manager
    }
    choices.push(choice);
  }

  questions.selectManager[0].choices = choices;

  answer = await inquirer.prompt(questions.selectManager);
  let manager = answer.manager;

  employee.setManager(manager);

  business.updateEmployeeManager(employee);

  showMainPrompt();
}

