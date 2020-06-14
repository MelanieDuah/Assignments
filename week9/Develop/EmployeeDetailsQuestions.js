module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Employee Name: ',
        validate: answer => answer.match(/^[A-Za-z\s]+$/) ? true : 'Enter a valid name'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email: ',
        validate: answer => answer.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? true : 'Enter a valid email'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Employee Role: ',
        choices: ['Engineer', 'Intern', 'Manager']
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'Manager Office Number: ',
        when: answers => answers.role == 'Manager',
        validate: answer => answer.match(/^[0-9]+$/) ? true : 'Enter a valid number'
    },
    {
        type: 'input',
        name: 'githubAccount',
        message: 'Engineer github account: ',
        when: answer => answer.role == 'Engineer',
        validate: answer => answer.match(/^[A-Za-z]+[A-Za-z0-9]+/) ? true : 'Enter a valid account name'
    },
    {
        type: 'input',
        name: 'school',
        message: 'School: ',
        when: answer => answer.role == 'Intern',
        validate: answer => answer.match(/^[A-Za-z]+/) ? true : 'Enter a valid School name'
    }
];
