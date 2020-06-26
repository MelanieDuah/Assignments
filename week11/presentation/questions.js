let mainQuestion = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do',
        choices: [
            'Add role',
            'Add department',
            'Add employee',
            'View all employee',
            'View employee by department',
            'View employee by manager',
            'Update employee role',
            'Update employee manager'
        ]
    },

];

let addEmployeeQuestions = [
    {
        type: 'input',
        name: 'firstName',
        message: `What is the employee's first name: `
    },
    {
        type: 'input',
        name: 'lastName',
        message: `What is the employee's last name: `
    },
    {
        type: 'list',
        name: 'role',
        message: `Enter employee's role: `,
    },
    {
        type: 'list',
        name: 'manager',
        message: `Who is the employee's manager`,
    },
];

let removeEmployeeQuestions = [
    {
        type: 'list',
        name: 'remove employee',
        message: `what would you like to do`,
        choices: [
            `Remove employee`,
            `Remove employee by rows`,
            `Remove employee by manager`
        ]
    },
    {
        type: 'list',
        name: 'employee',
        message: `which employee do you want to remove?`,
        choices: ``
    },

];

let addRoleQuestion = [
    {
        type: 'input',
        name: 'roleName',
        message: `Enter role name: `,
    },
    {
        type : 'list',
        name : 'department',
    },
    {
        type:'number',
        name:'salary',
        message:`Enter salary for this role`
    },
];

let addDepartmentQuestion = [
    {
        type: 'input',
        name: 'departmentName',
        message: `Enter department name: `
    }
];

let questions = {
    mainQuestion: mainQuestion,
    addEmployeeQuestions: addEmployeeQuestions,
    addRoleQuestion: addRoleQuestion,
    addDepartmentQuestion : addDepartmentQuestion
}

module.exports = questions;