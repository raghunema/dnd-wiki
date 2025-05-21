const fs = require('fs');
const { type } = require('os');
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

//function to get all the different keys in the data
function generateKeys(newData, oldData) {
    const allKeys = Object.keys(newData);

    for (const key in oldData) {
        if (!allKeys.includes(key)) {
            allKeys.push(key)
        }
    }
    return allKeys;
}

function cleanup(changes) {
    for (const key in changes) {
        if (typeof changes[key] == 'object' && changes[key] !== null) {
            cleanup(changes[key]);
            if (Object.keys(changes[key]).length === 0) {
                delete changes[key];
            } 
        }
    }
}

//main compare function
function compare(key, newData, oldData, direction) {
    var changes = {};

    console.log(`Comparing Key: ${key}`)

    if (!oldData.hasOwnProperty(key)) { //inserts
        changes[`${key}.Add`] = {'data': newData[key]};
    } else if (!newData.hasOwnProperty(key)) { //deletes
        changes[`${key}.Delete`] = {'data': newData[key]};
    } else { //updates
        if (newData[key] != oldData[key]) {

            if (typeof newData[key] != 'object') {
                changes[`${key}.Update`] = {'data': newData[key]}
            } else {
                changes[`${key}.Update`] = {};
                childKeys = generateKeys(newData[key], oldData[key])
                console.log(childKeys)

                for (const childKey of childKeys) {

                    console.log(`Child Key: ${childKey}`)
                    changes[`${key}.Update`][childKey] = compare(childKey, newData[key],  oldData[key], 1)
                    console.log(`Checking length of [${key}.Update][${childKey}]: ${Object.keys(changes[`${key}.Update`][childKey]).length}`)


                    if (Object.keys(changes[`${key}.Update`][childKey]).length === 0) {
                        console.log(`Deleting: [${key}.Update][${childKey}]`)
                        delete changes[`${key}.Update`][childKey]
                    }
                } 
            }   
        }
    }

    return changes;
}

//parent function to get all the keys for the differences
function compare_controller(newData, oldData, changeLog) {
    var changes =  {};
    changes.version = 1;

    const allKeys = generateKeys(newData, oldData);
    console.log(allKeys)

    for (const key of allKeys) {
        //console.log(`comparing key: ${key}`)
        changes[key] = compare(key, newData, oldData, 1)
    } 

    cleanup(changes);
    //console.log(changes)
    return changes;
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
            const changeData = JSON.parse(fs.readFileSync(changeLog, 'utf8'));

            console.log(`Comparing new file: ${args[1]} against old file: ${args[2]}, writing to ${args[3]}`);
            changes = compare_controller(newData, oldData, changeData);
            fs.writeFileSync(changeLog, JSON.stringify(changes, null, 2));
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