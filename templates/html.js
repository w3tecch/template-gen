module.exports = {
    name: 'HTML',
    description: 'Creating a HTML file',
    target: 'html',
    parameters: {
        type: 'text',
        name: 'name',
        message: 'Whats the HTML name?'
    },

    template: (params) => {
        return `<h1>${params.name}</h1>`;
    },

    fileName: (params) => {
        return `${params.name}.html`;
    }
}