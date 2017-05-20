const path = require('path'); //handled by nodejs runtime
//need entry(input) and build output
// entry point of application - typically index.js - start of module building process
// output: location to save file to, name of file
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    }
};

module.exports = config;