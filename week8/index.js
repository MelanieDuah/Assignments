const inquirer = require('inquirer');
const fs = require('fs');
inquirer.prompt([
    {
        type: 'input',
        name: 'first',
        message: 'Project Title:'
    },
    {
        type: 'input',
        name: 'second',
        message: 'Description:'
    },
    {
        type: 'input',
        name: 'third',
        message: 'Table of Contents:'

    },
    {
        type: 'input',
        name: 'fourth',
        message: 'Installation:'
    },
    {
        type: 'input',
        name: 'fifth',
        message: 'Usage:'
    },
    {
        type: 'input',
        name: 'sixth',
        message: 'License:'
    },
    {
        type: 'input',
        name: 'seventh',
        message: 'Contributing:'
    },
    {
        type: 'input',
        name: 'eigth',
        message: 'Tests:'
    },
    {
        type: 'input',
        name: 'ninth',
        message: 'Question'
    },
    {
        type: 'list',
        name: 'tenth',
        message: 'badge',
        choices: ['ISC', 'Mozilla', 'Perl']
    },
])
    .then((answer) => {
        console.log('', answer);
        
        let badgeUrl = '';
        if (answer.tenth === 'ISC') {
            badgeUrl = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
        } else if (answer.tenth === 'Mozilla') {
            badgeUrl = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)]';
        } else {
            (answer.tenth === Perl)
            badgeUrl = '![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)]'
        }

        const readmeString = `
# Project Title:${answer.first}
# Description:${answer.second}
# Table of Contents:${answer.third}
# Installation:${answer.fourth}
# Usage:${answer.fifth}
# License:${answer.sixth}
# Contributing:${answer.seventh}
# Tests:${answer.eigth}
# Questions:${answer.ninth}
${badgeUrl}
    `

        fs.writeFile('README.md', readmeString, function (err) {
            if (err) throw err;
            console.log('Saved!');
        })
    })
