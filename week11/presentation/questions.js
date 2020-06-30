let mainQuestion = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do',
        choices: [
            { name: 'Add department', value: 'addDepartment' },
            { name: 'Add role', value: 'addRole' },
            { name: 'Add employee', value: 'addEmployee' },
            { name: 'View all employees', value: 'viewAllEmployees' },
            { name: 'View employees by department', value: 'viewEmployeesByDepartment' },
            { name: 'View employees by manager', value: 'viewEmployeesByManager' },
            { name: 'Update employee role', value: 'updateEmployeeRole' },
            { name: 'Update employee manager', value: 'updateEmployeeManager' }
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
        type: 'list',
        name: 'department',
    },
    {
        type: 'number',
        name: 'salary',
        message: `Enter salary for this role`
    },
];

let addDepartmentQuestion = [
    {
        type: 'input',
        name: 'departmentName',
        message: `Enter department name: `
    }
];

let selectDepartment = [
    {
        type: 'list',
        name: 'department',
        message: 'Select department: '
    },
];

let selectManager = [
    {
        type: 'list',
        name: 'manager',
        message: 'Select manager: '
    },
];

let selectEmployee = [
    {
        type: 'list',
        name: 'employee',
        message: 'Select employee: '
    },
];
let selectRole = [
    {
        type: 'list',
        name: 'role',
        message: 'Select role: '
    },
];

let questions = {
    mainQuestion: mainQuestion,
    addEmployeeQuestions: addEmployeeQuestions,
    addRoleQuestion: addRoleQuestion,
    addDepartmentQuestion: addDepartmentQuestion,
    selectDepartment: selectDepartment,
    selectManager: selectManager,
    selectEmployee:selectEmployee,
    selectRole:selectRole
}

module.exports = questions;