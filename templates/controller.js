module.exports = {
    name: 'Controller',
    description: 'Creating a controller',
    target: 'controllers',
    wrapFolder: params => `${params.controller.toLowerCase()}`,
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
    files: [
        {
            template: params => {
                return `export default class ${params.controller} {
    someAttribute = '';` +
                    (params.haveConstructor ? `

    constructor () {

    }` : '') +
                    `
}
`;
            },
            fileName: params => `${params.controller}Controller.ts`
        },
        {
            template: () => '<template></template>',
            fileName: params => `${params.controller}Controller.html`
        }
    ]
}