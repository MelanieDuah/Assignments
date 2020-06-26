const inquirer = require('inquirer');
const questions = require('./presentation/questions');
const EmployeeBusiness = require('./business/employeeBusiness');
const Employee = require('./dataentities/employee');
let business = new EmployeeBusiness();

async function showMainPrompt() {
  let answers = await inquirer.prompt(questions.mainQuestion);
  if (answers.main == 'Add role') {
    promptAddRole();
  } else if (answers.main == 'Add department') {
    promptAddDepartment();
  }
  else if (answers.main == 'Add employee') {
    promptAddEmployee();
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
  for (department of departments) {
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
  for (role of roles) {
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

  let choices = [];
  for (manager of employees) {
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
