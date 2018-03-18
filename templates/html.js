module.exports = {
    name: 'HTML',
    description: 'Creating a HTML file',
    target: 'html',
    wrapFolder: undefined,
    parameters: {
        type: 'text',
        name: 'name',
        message: 'Whats the HTML name?'
    },
    files: [
        {
            template: params => `<h1>${params.name}</h1>`,
            fileName: params => `${params.name}.html`
        }
    ]
}