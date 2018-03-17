module.exports = {
    name: 'Controller',
    description: 'Creating a controller',
    target: 'controllers',
    parameters: [
        {
            type: 'text',
            name: 'controller',
            message: 'Whats the controller name?'
        },
        {
            type: 'confirm',
            name: 'haveConstructor',
            message: 'With a constructor?'
        }
    ],

    template: (params) => {
        return `
export default class ${params.controller} {
    someAttribute = '';` +
            (params.haveConstructor ? `

    constructor () {

    }` : '') +
`
}
`;
    },

    fileName: (params) => {
        return `${params.controller}Controller.ts`;
    }
}