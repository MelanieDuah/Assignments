const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeDetailsQuestions = require('./EmployeeDetailsQuestions');

const mainQuestion = [{
   type: 'list',
   name: 'mainQuestion',
   message: "Would you like to add an Employee?",
   choices: ['Yes', 'No']
}];


let employeeList = [];

function promptAboutEmployee() {
   inquirer.prompt(mainQuestion).then(answer => {

      if (answer.mainQuestion == 'Yes') {
         inquirer.prompt(employeeDetailsQuestions).then(answer => {
           
            answer.id = employeeList.length + 1;

            let employee = createEmployee(answer);
            
            employeeList.push(employee);

            promptAboutEmployee();
         });
      }
      else{
         const html = render(employeeList);
         saveHtml(html);
      }
   });
}

function createEmployee(details){
   let employee = null;

   switch (details.role) {
      case 'Manager':
         employee = new Manager(details.name, details.id, details.email, details.officeNumber);
         break;
      case 'Engineer':
         employee = new Engineer(details.name, details.id, details.email, details.githubAccount);
         break;
      case 'Intern':
         employee = new Intern(details.name, details.id, details.email, details.school);
         break;
   }

   return employee;
}

function saveHtml(html){
   fs.writeFile('index.html', html, function (err) {
      if (err) throw err;
      console.log('Employee List Html Created!');
  })
}

promptAboutEmployee();
