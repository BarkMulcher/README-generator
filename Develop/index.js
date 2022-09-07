const fs = require('fs');
const inquirer = require('inquirer');
// reference remote JS file location
const generateMarkdown = require('./utils/generateMarkdown');

const fileName = 'README.md';

// questions
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
            default: 'A very exciting project!',
        },
        {
            type: 'input',
            name: 'motivation',
            message: 'What was your motivation for this project?',
            default: 'Motivational Motivations',
        },
        {
            type: 'input',
            name: 'inspiration',
            message: 'What was your inspiration for this project?',
            default: 'Problematic Problems',
        },
        {
            type: "input",
            name: "installation",
            message: "Add installation instructions for your project",
        },
        {
            type: 'input',
            name: 'usage',
            message: 'How do you use this app?',
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What languages/technologies were used to create this project?',
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
            type: 'input',
            name: 'contributing',
            message: 'Tell other how they can contribute',
            default: 'Contact via information found in the "Contact" section of this README.'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'How do you test this project?',
            default: 'There are no tests for this project',
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
            default: false,
        },
        {
            type: 'input',
            name: 'collabname',
            message: "Enter your collaborators' information",
            when(answers) {
                return answers.collaborators;
            }
        },
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
            when: (answers) => {
                return answers.contactchoice.includes('Email')
            },
        },
        {
            type: 'input',
            name: 'contactPhone',
            message: 'Please enter your phone number:',
            when(answers) {
                return answers.contactchoice.includes('Phone');
            },
        },
        {
            type: 'input',
            name: 'contactGitHub',
            message: 'Please enter your GitHub profile URL:',
            when(answers) {
                return answers.contactchoice.includes('GitHub');
            },
        },
    ])

}
// function to write README file
writeToFile = (data) => {

    fs.writeFile(fileName, data, (err) => {

        if (err) {
            return console.log(err);
        } else
            console.log('success');
    });
}


// function to initialize app
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

init();
