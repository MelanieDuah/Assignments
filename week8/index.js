const inquirer = require('inquirer');
const fs = require('fs');
let getLicenseText = require('./license');

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'Project Title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage:'
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Contributing:'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Tests:'
    },
    {
        type: 'input',
        name: 'username',
        message: 'Github username:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Your email:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'license',
        choices: ['ISC', 'Mozilla', 'Perl']
    },
])
    .then((answer) => {
        console.log('', answer);

        let badgeUrl = '';
        if (answer.license === 'ISC') {
            badgeUrl = '![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
        } else if (answer.license === 'Mozilla') {
            badgeUrl = '![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)';
        } else {
            (answer.license === 'Perl')
            badgeUrl = '![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)'
        }

        const readmeString = `
${badgeUrl}

#Title
  ${answer.title}

#Table Of Contents
  - [Title](#Title)
  - [Description](#Description)
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [License](#License)
  - [Contributing](#Contributing)
  - [Tests](#Tests)

# Description
  ${answer.description}
# Installation
  ${answer.installation}
# Usage
  ${answer.usage}
# License
  ${getLicenseText(answer.license)}
# Contributing
  ${answer.contribution}
# Tests
  ${answer.test}
# Questions
   You can look me up with [Github](https://github.com/${answer.username}).
   For further information or any other questions you may have, you can send me an email: ${answer.email}
    `
        fs.writeFile('README.md', readmeString, function (err) {
            if (err) throw err;
            console.log('Saved!');
        })
    })
