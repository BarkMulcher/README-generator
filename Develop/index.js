// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// link to README folder
const generateMarkdown = require('./utils/generateMarkdown');

const fileName = 'README.md';

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
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
            type: "input",
            name: "installation",
            message: "Add installation instructions for your project"
        },
        {
            type: 'input',
            name: 'usage',
            message: 'How do you use this app?',
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What languages/interfaces were used to create this project?',
            choices: ['HTML',
                'CSS',
                'JavaScript',
                'Node.JS'],
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
                "GPL v3",
                "MIT",
                "No License (not recommended)"],
        },
        {
            type: 'confirm',
            name: 'collaborators',
            message: 'Do you have any collaborators?',
        },
        {
            type: 'input',
            name: 'collabNames',
            message: "Enter your collaborators' information",
            // create 'when' statement to spur next question
            when(answers) {
                return answers.collaborators;
            } 
        },
        // 'when' for entering desired contact info 
        {
            type: 'checkbox',
            name: 'contactchoice',
            message: "Choose how you'd like to be contacted:",
            choices: ['Email',
                'Phone',
                'GitHub'],
        },
        {
            type: 'input',
            name: 'contactEmail',
            message: 'Please enter your email address:',
            when(answers) {
                return answers.contactchoice === 'Email';
            },
        },
        {
            type: 'input',
            name: 'contactPhone',
            message: 'Please enter your phone number:',
            when(answers) {
                answers.contactchoice === 'Phone';
            },
        },
        {
            type: 'input',
            name: 'contactGitHub',
            message: 'Please enter your GitHub profile URL:',
            when(answers) {
                answers.contactchoice === 'GitHub';
            },
        },
    ]);
}

// TODO: Create a function to write README file
writeToFile = (data) => {

    fs.writeFile(fileName, data, (err) => {
        if (err) {
            return console.log(err);
        } else
            console.log('success');
    });
}


// TODO: Create a function to initialize app
const init = () => {
    questions()
        .then((answers) => {
            return generateMarkdown(answers);
        })
        .then((data) => {
            return writeToFile(data);
        })
        .catch((err) => {
            console.log(err);
        })

}
// Function call to initialize app
init();
