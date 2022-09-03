// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown');


// TODO: Create an array of questions for user input

inquirer
    .prompt([
        {
            type: 'name',
            name: 'readmeTitle',
            message: 'Give your README a good title:',
            validate: function (answer) {
                if (!answer.length) {
                    return "you must enter a value"
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Write a short description for your project:',
        },
        {
            type: 'input',
            name: 'motivation',
            message: 'What was your motivation for this project?'
        },
        {
            type: 'input',
            name: 'projectInspiration',
            message: 'What problems were solved by completing this project?'
        },
        {
            type: 'input',
            name: 'learning',
            message: 'What did you learn while creating this project?',
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What languages were used to create this project?',
            choices: ['HTML', 'CSS', 'JavaScript'],
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Add installation instructions, if applicable:',
        },
        {
            type: 'list',
            name: 'license',
            message: 'What license are you using?',
            choices: ["Apache 2.0",
                "GPL v2",
                "WWE",
                "MIT"],
        },
        {
            type: 'confirm',
            name: 'collaborators',
            message: 'Do you have any collaborators?',
            // create if/else to spur next question
        },
        {
            type: 'input',
            name: 'collabNames',
            message: "Enter your collaborators' information",
        },
        // make if/else for entering desired contact info below
        {
            type: 'input',
            name: 'contactEmail',
            message: 'Please enter your email address:',
        },
        {
            type: 'input',
            name: 'contactPhone',
            message: 'Please enter your phone number:',
        },
        {
            type: 'input',
            name: 'contactGitHub',
            message: 'Please enter your GitHub profile URL:',
        }
    ])

    .then((data) => {

// TODO: Create a function to write README file
writeToFile = (fileName, data) => {

    fs.writeFile(fileName, data, (err) => {
        if (err) {
            return console.log(err);
        } else
            console.log('success');
    })
}
})

// TODO: Create a function to initialize app
const init = () => {
    inquirer.prompt()
        .then((data) => 
        writeToFile(fileName, generateMarkdown(data)))
}

// Function call to initialize app
init();
