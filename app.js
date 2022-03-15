const processArgs = process.argv.slice(2);

if (processArgs.length < 1 || processArgs.length > 1) {
    console.log('Please provide the path with the script and its inputs');
    process.exit(1);
}

const fs = require('fs');

let path = processArgs[0];
if (!fs.existsSync(path)) {
    console.log('The provided path "' + path + '" does not exist');
    process.exit(1);
} else {
    // we might need to adjust path if needed, if we do not have a full path
    if (!path.startsWith('/') && !path.startsWith('~/')) {
        // not a full path and not a relative path, need to add relative path
        if (!path.startsWith('./')) {
            path = './' + path;
            // now that we modified it, re-check, just in case
            if (!fs.existsSync(path)) {
                console.log('The provided path "' + path + '" does not exist');
                process.exit(1);
            }
        }
    }
}

if (!fs.existsSync(path + '/script.js')) {
    console.log('The provided path "' + path + '" does not contain "script.js"');
    process.exit(1);
}

if (!fs.existsSync(path + '/inputs')) {
    console.log('The provided path "' + path + '" does not contain the "inputs" directory');
    process.exit(1);
}

let inputFiles = [];
fs.readdirSync(path + '/inputs').map(fileName => {
    if (fileName.split('.').pop() === 'json') {
        inputFiles.push(path + '/inputs/' + fileName);
    }
});

if (inputFiles.length < 1) {
    console.log('The provided input directory "' + path + '/inputs/" does not contain input files');
    process.exit(1);
}

let trayStep = require(path + '/script.js').step;
global._ = require('lodash');
global.mout = require('mout');
global.moment = require('moment');

let input = {};
let trayVariables = {};

inputFiles.forEach((file) => {
    console.log('====================================================================================================');
    console.log('===== Executing: ' + path + '/script.js' + ' with input file: ' + file);
    console.log('====================================================================================================');
    console.log('');

    input = require(file);
    trayVariables = {};
    input.variables.forEach((v) => {
        trayVariables[v.name] = v.value;
    });

    console.log('');
    console.log('Script logs:');
    console.log('');
    let output = trayStep(trayVariables);
    console.log('');
    console.log('Script output:');
    console.log('');
    console.log(output);

    console.log('');
    console.log('====================================================================================================');
    console.log('===== Output of: ' + path + '/script.js' + ' with input file: ' + file);
    console.log('====================================================================================================');
    console.log('');
    console.log('');
    console.log('');
});
