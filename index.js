#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const prompts = require('prompts');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');

let templatePath = argv.d || undefined;
let templateAction = argv && argv._ && Array.isArray(argv._) && argv._[0] || undefined;
let templateObject;

/**
 * Github
 * npm
 */

(async function () {

    await banner('Template Generator');

    /**
     * Fallback for template path
     */
    if (templatePath === undefined) {

        // Check if there is a .tgrc file
        if (fs.existsSync('./.tgrc')) {
            try {
                templatePath = JSON.parse(fs.readFileSync('./.tgrc').toString()).path;
            } catch (error) {
                console.log(chalk.red(`Could not parse .tgrc file`));
                process.exit(1);
            }
        } else {
            console.log(chalk.yellow(`No template folder provided. Searching in for "./templates" folder in: ${process.cwd()}`));

            if (fs.existsSync('./templates')) {
                templatePath = './templates';
                console.log(chalk.yellow(`Found template folder in: ${process.cwd()}`));
            } else {
                console.log(chalk.yellow('Template folder could not be found.'));

                try {
                    let response = await prompts({
                        type: 'text',
                        name: 'templatePath',
                        message: 'Please provide a template paths?',
                        initial: './templates'
                    });
                    templatePath = response.templatePath;
                } catch (error) {
                    process.exit(1);
                }
            }
        }
    }

    /**
     * Get all template files
     */
    const templateFiles = await new Promise(resolve => {
        glob(`${templatePath}/**/*.js`, (err, files) => {
            if (err) {
                console.log(chalk.red(`Could not find any template files in ${templatePath}/**/*.js`));
                process.exit(1);
            }

            if (files.length === 0) {
                console.log(chalk.red(`Could not find any template files in ${templatePath}/**/*.js`));
                process.exit(1);
            }

            resolve(files.map(file => require(file)));
        });
    });

    /**
     * Fallback for template action
     */
    if (templateAction === undefined) {
        try {
            let response = await prompts({
                type: 'select',
                name: 'templateObject',
                message: 'Pick an template?',
                choices: templateFiles.map(file => ({ title: file.name, value: file }))
            });
            templateObject = response.templateObject;
        } catch (error) {
            process.exit(1);
        }
    } else {
        templateObject = templateFiles.find(file => file.name === templateAction);
        if (templateObject === undefined) {
            console.log(chalk.red(`The template with name "${templateAction}" could not be found`));
            process.exit(1);
        }
    }

    /**
     * Execute template
     */
    if (templateObject) {
        await (async function () {
            console.log('');
            console.log(chalk.green.bold(templateObject.description));
            console.log('');

            const parameters = await prompts(templateObject.parameters);
            const file = templateObject.fileName(parameters);
            const fullFilePath = path.join(templateObject.target, file);

            if (fs.existsSync(fullFilePath)) {
                let response = await prompts({
                    type: 'confirm',
                    name: 'shouldOverwrite',
                    message: 'The file exists you want to overwrite?',
                    initial: false
                }, { onCancel: () => process.exit(0) });
                if (!response.shouldOverwrite) {
                    process.exit(0);
                }
            }

            fs.writeFile(
                fullFilePath,
                templateObject.template(parameters),
                (err) => {
                    if (err) {
                        console.log(chalk.red(`The was an error while saving file "${file}" in: ${fullFilePath}`));
                        process.exit(1);
                    }
                    console.log(chalk.green(`File "${fullFilePath}" created`));
                });
        })();
    }

})();

/**
 * Helpers
 */
function banner(title) {
    return new Promise(resolve => {
        figlet(title, (error, data) => {
            if (error) {
                return process.exit(1);
            }

            console.log(chalk.blue(data));
            console.log('');
            resolve();
        });
    });
}