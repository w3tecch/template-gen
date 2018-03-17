<p align="center">
  <img src="./w3tec-logo.png" alt="w3tec" width="400" />
</p>

<h1 align="center">Template Generator</h1>

<p align="center">
  <a href="https://david-dm.org/w3tecch/template-generator">
    <img src="https://david-dm.org/w3tecch/template-generator/status.svg?style=flat" alt="dependency" />
  </a>
  <a href="https://travis-ci.org/w3tecch/template-generator">
    <img src="https://travis-ci.org/w3tecch/template-generator.svg?branch=master" alt="travis" />
  </a>
  <a href="https://ci.appveyor.com/project/dweber019/template-generator/branch/master">
    <img src="https://ci.appveyor.com/api/projects/status/f8e7jdm8v58hcwpq/branch/master?svg=true&passingText=Windows%20passing&pendingText=Windows%20pending&failingText=Windows%20failing" alt="appveyor" />
  </a>
</p>

<p align="center">
  <b>A delightful way to have a flexible template generator for all sorts of templates</b></br>
  Heavily inspired by <a href="https://github.com/angular/angular-cli/wiki/generate">Angular CLI</a> and the <a href="http://aurelia.io/docs/build-systems/aurelia-cli#generators">Aurelia CLI</a>.
</p>

<br />

## ❯ Why

It's tedious to always copy & past the same file or file content over and over again. In addition the content has be clean up over and over because mostly we need a clean version of the content. This module can be used as a cli or integrated into any node based project.

## ❯ Table of Contents

- [Installation](#-installation)
- [Getting Started](#-getting-started)
- [RC configuration](#-rc-configuration)

## ❯ Installation

### As global CLI
You can install this module globally by
```shell
npm install -g template-generator
```

Have a look at [RC configuration](#-RC-configuration) how you can setup a template path.

### As project dependency
Add this module to your project dependencies
```shell
npm install template-generator --save-dev
```

then add the following entry to your npm scripts
```json
{
    "tg": "template-gen -d ./templates"
}
```

## ❯ Getting Started

### Setup a template file

First you need to create a template folder. We recommend to use `templates` as name as this module will look for this folder automatically.
```shell
mkdir templates
```
> Alternatively you can pass the template path with parameter as shown in the installation instructions.

<br>

Next we need a template file. Create a file (e.g. `controller.js`) within the `templates` folder with the following content
```javascript
module.exports = {
    name: 'Controller',
    description: 'Creating a controller',
    target: 'controllers',
    parameters: {
        type: 'text',
        name: 'controller',
        message: 'Whats the controller name?'
    },

    template: (params) => {
        return `super bubu ${params.controller}`;
    },

    fileName: (params) => {
        return `${params.controller}Controller.ts`;
    }
}
```
> Don't forget to create the `controllers` folder

<br>

| Attribute      | Description |
| -------------- | ----------- |
| name           | The name to enter or select in the CLI |
| description    | Will be shown after you selected the name in the CLI |
| target         | The target directory from the root where the file will be created in |
| parameters     | The CLI prompts to ask the user, you can use this [prompts](https://github.com/terkelg/prompts) options |
| template       | The content of the generated file |
| fileName       | The file name of the generated file |

> The parameters attribute can be a object or an array of [prompts](https://github.com/terkelg/prompts) options.

### Usage
With the above example setup you can now run
```shell
npm run tg
```

Then you will be asked for the template parameters and finally create the file.


## ❯ RC configuration
In you project root you can create a file named `.tgrc` to configure you template path
```shell
{
    "path": "./templates"
}
```


## ❯ Related Projects

- [aurelia-typescript-boilerplate](https://github.com/w3tecch/aurelia-typescript-boilerplate) - An Aurelia starter kit with TypeScript
- [express-typescript-boilerplate](https://github.com/w3tecch/express-typescript-boilerplate) - An express starter kit with TypeScript

## ❯ License

[MIT](/LICENSE)