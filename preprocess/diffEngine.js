const fs = require('fs');
const path = require('path');


//takes in a json object and traverses it
function traverse(obj, path = []) {
    if (typeof obj == 'object' && obj != null) {
        for (const key in obj) {
            traverse(obj[key], [...path, key])
        }
    } else {
        console.log(`Path: ${path.join('.')} = ${obj}`);
    }
}

function compare(newData, oldData, changeLog) {
    var changes = {};

    //Check for additions and updates
    for (const key in newData) {
        if (!(key in oldData)) {
            changes[key] = {"Operation": 'Add', "data": newData[key]};
        }
    }

    console.log(changes);
    fs.writeFileSync(changeLog, JSON.stringify(changes, null, 2));
}

function load(...args) {
    const operation = args[0];

    switch (operation) {
        case 'traverse':
            const file = path.resolve(__dirname, args[1]);
            const data = JSON.parse(fs.readFileSync(file, 'utf8'));
            console.log(`Traversing ${file}`);
            traverse(data, []);
            break;
        case 'compare':
            const newFile = path.resolve(__dirname, args[1]);
            const oldFile = path.resolve(__dirname, args[2]);
            const changeLog = path.resolve(__dirname, args[3])

            const newData = JSON.parse(fs.readFileSync(newFile, 'utf8'));
            const oldData = JSON.parse(fs.readFileSync(oldFile, 'utf8'));

            console.log(`Comparing new file: ${args[1]} against old file: ${args[2]}, writing to ${args[3]}`);
            compare(newData, oldData, changeLog);
            break;
        default:
            console.log('Invalid arguements');
            console.log(`Arguements: ${args}`)
            process.exitCode = 1;
            process.exit();
    }

}

//node diffEngine.js OPERATION [PARAMATERS]
if (require.main == module) {
    switch(process.argv[2]) {
        case 'traverse':
            if (process.argv.length < 3) {
                console.log('Filepath required');
                process.exitCode = 1;
                process.exit();
            }
            load(process.argv[2], process.argv[3]);
            break;
        case 'compare':
            if (process.argv.length < 4) {
                console.log('2 files required to compare');
                process.exitCode = 1;
                process.exit();
            }
            load(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
            break;
        default: 
            console.log("Invalid command")
            process.exitCode = 1;
            process.exit();
    }
}