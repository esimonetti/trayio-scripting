/*
    Adapted from the original work of https://github.com/trayio/script-connector-tester/blob/master/run.js
    Modified and improved by Enrico Simonetti @ www.naonis.tech
*/

const processArgs = process.argv.slice(2);
const fs = require('fs');
const util = require('util');
const path = require('path');

if (processArgs.length !== 1) {
    console.log('Please provide the path with the script and its inputs. Usage: node app.js <step path>');
    process.exit(1);
}

let providedPath = processArgs[0];
if (!fs.existsSync(providedPath)) {
    console.log('The provided path "' + providedPath + '" does not exist');
    process.exit(1);
} else {
    providedPath = path.resolve(providedPath);
}

if (!fs.existsSync(path.join(providedPath, 'script.js'))) {
    console.log('The provided path "' + providedPath + '" does not contain "script.js"');
    process.exit(1);
}

if (!fs.existsSync(path.join(providedPath, 'inputs'))) {
    console.log('The provided path "' + providedPath + '" does not contain the "inputs" directory');
    process.exit(1);
}

const inputFiles = fs.readdirSync(path.join(providedPath, 'inputs'))
    .filter(fileName => path.extname(fileName) === '.json')
    .map(fileName => path.join(providedPath, 'inputs', fileName));

if (inputFiles.length < 1) {
    console.log('The provided input directory "' + path.join(providedPath, 'inputs') + '" does not contain input files');
    process.exit(1);
}

let trayStep = require(path.join(providedPath, 'script.js')).step;
global._ = require('lodash');
global.mout = require('mout');
global.moment = require('moment');

inputFiles.forEach((file) => {
    console.log('====================================================================================================');
    console.log('===== Executing: ' + path.join(providedPath, 'script.js') + ' with input file: ' + file);
    console.log('====================================================================================================');
    console.log('');

    let input = require(file);
    let trayVariables = {};

    input.variables.forEach((v) => {
        trayVariables[v.name] = v.value;
    });

    console.log('');
    console.log('Script logs:');
    console.log('');
    let output;
    try {
        output = trayStep(trayVariables);
    } catch (error) {
        console.error('Error while executing the script: ', error);
        process.exit(1);
    }
    console.log('');
    console.log('Script output:');
    console.log('');
    // Use util.inspect to log the entire object with complete nested structures
    console.log(util.inspect(output, { depth: null, colors: true }));
    console.log('');
    console.log('====================================================================================================');
    console.log('===== Output of: ' + path.join(providedPath, 'script.js') + ' with input file: ' + file);
    console.log('====================================================================================================');
    console.log('');
    console.log('');
    console.log('');
});