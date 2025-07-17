const fs = require('fs');
//const { type } = require('os');
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

//clean up function for the changes function
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
function compare(key, newData, oldData) {
    var changes = {};

    //console.log(`Comparing Key: ${key}`)

    if (!oldData.hasOwnProperty(key)) { //inserts
        changes[`${key}.Add`] = newData[key];
    } else if (!newData.hasOwnProperty(key)) { //deletes
        changes[`${key}.Delete`] = oldData[key];
    } else { //updates
        if (newData[key] != oldData[key]) {

            if (typeof newData[key] != 'object') {
                changes[`${key}.Update`] = newData[key];
            } else {
                changes[`${key}.Update`] = {};
                childKeys = generateKeys(newData[key], oldData[key])
                //console.log(childKeys)

                for (const childKey of childKeys) {
                    //console.log(`Child Key: ${childKey}`)
                    changes[`${key}.Update`][childKey] = compare(childKey, newData[key],  oldData[key])
                    // console.log(`Checking length of [${key}.Update][${childKey}]: ${Object.keys(changes[`${key}.Update`][childKey]).length}`)

                    // if (Object.keys(changes[`${key}.Update`][childKey]).length === 0) {
                    //     console.log(`Deleting: [${key}.Update][${childKey}]`)
                    //     delete changes[`${key}.Update`][childKey]
                    // }
                } 
            }   
        }
    }

    return changes;
}

//parent function to get all the keys for the differences
function compare_controller(newData, oldData) {
    var changes =  {};

    //gets all keys - to accounted for deleted information when going from old to new
    const allKeys = generateKeys(newData, oldData);
    //console.log(allKeys)

    for (const key of allKeys) {
        //console.log(`comparing key: ${key}`)
        changes[key] = compare(key, newData, oldData, 1)
    } 

    cleanup(changes); //removes any empty objects
    //console.log(changes)
    return changes;
}

//Metadata tracker for the data -> Call function when you want to update the data file
function updateData(newData) {
    const metaDataPath = path.resolve(__dirname, './metadata/metadata.json');
    const metaData = JSON.parse(fs.readFileSync(metaDataPath, 'utf8'));
    var version = metaData.version;

    //console.log(`curr file: ${metaData.currFile}`)

    //check if the new data is the same as the old data
    const currData = JSON.parse(fs.readFileSync(path.resolve(__dirname, metaData.currFile), 'utf8'))
    const changes = compare_controller(newData, currData)

    //Do nothing
    if (Object.keys(changes).length == 0) {
        console.log("Your file has not changes, no need to update");
        return;
    }

    //console.log(`old data: ${metaData.oldFile}`)
    const oldFile = path.resolve(__dirname, metaData.oldFile)

    var newChangeLog = 0;
    //if the old version number is divisible by 10, make a snapshot, and start a new changeLog file
    if ((version - 1) % 10 == 0) {
        const snapshotPath = path.resolve(__dirname, `./metadata/snapshots/dataSnapshot_${version - 1}.json`)
        const oldData = fs.readFileSync(oldFile, 'utf8');
        fs.writeFileSync(snapshotPath, oldData)

        //update the change log we are writing to
        const changeLogPath = path.resolve(__dirname, `./metadata/changeLogs/changeLog_${version}.json`)
        metaData.changeLog = changeLogPath;
        newChangeLog = 1;
    } 

    //copy current to old
    fs.writeFileSync(oldFile, JSON.stringify(currData, null, 2))
    //copy new data to current
    fs.writeFileSync(path.resolve(__dirname, metaData.currFile), JSON.stringify(newData, null, 2))

    //update version
    version += 1;
    metaData.version = version;

    //write the current file to a new file
    const changeLogPath = path.resolve(__dirname, metaData.changeLog);

    var changeLogChanges = {};
    changeLogChanges.version = version;
    changeLogChanges.changes = changes;

    if (newChangeLog) {
        fs.writeFileSync(changeLogPath, JSON.stringify([changeLogChanges], null, 2));
    } else {
        let log = [];
        log = JSON.parse(fs.readFileSync(changeLogPath, 'utf8'));
        log.push(changeLogChanges);

        fs.writeFileSync(changeLogPath, JSON.stringify(log, null, 2))
    }

    console.log(metaData)
    //update metadata file
    fs.writeFileSync(metaDataPath, JSON.stringify(metaData, null, 2))

    updateDictionary(metaData, changes)

}

//make dictionary for data visualization
function getDictionary(data, dictionary = {}) {
    // dictionary = {};

    for (const key in data) {
        //console.log(`Key: ${key}, ${key.id}, ${typeof data[key]}`)
        if (typeof data[key] == 'object' && data[key] != null && data[key].id) {
            dictionary[data[key].id] = {};
        }
       
        //recursive call to get objects in objects
        if (typeof data[key] == 'object' && key != null) {
            getDictionary(data[key], dictionary);
        }
    }

    //console.log(`${JSON.stringify(dictionary, null, 2)}`)
    return dictionary;
}

//populat the dictionary with data
function populate_dictionary(data, references, dict) {
    const id = data.id
    //console.log(id)

    var dataString = "";
    for (const item in data) {
       dataString = dataString.concat(data[item] + " ").toLowerCase();
    }


    // const dataInfoArr = dataString.split(/[" ", ,]/);
    // console.log(dataInfoArr)

    for (const ref in references) {
        if (!references.hasOwnProperty(ref) || references[ref] == id) continue;

        const tempArr = dataString.split(ref.toLowerCase())
        console.log(`testing: ${tempArr}: ${tempArr.length}`)

        dict[id][references[ref]] += (tempArr.length - 1)

        // for (const i in dataInfoArr) {
        //     if (dataInfoArr[i] == ref) {
        //         console.log(dataInfoArr[i])

        //         dict[id][references[ref]] += 1

        //     }
        // }
        
    }

}

//controller for the dictionary
function getDictionary_controller(data, references, output_file) {
    var items = getDictionary(data);

    //makes a dictionary of dictionaries
    var dictionary = {};
    for (const key in items) {
        dictionary[key] = {};
        for (const keyTwo in items) {
            if (keyTwo == key) continue;
            //console.log(typeof childkey)
            dictionary[key][keyTwo] = 0;
        }
    }

    //Object.entries(data).forEach(())

    for (const category in data) {
        if (!data.hasOwnProperty(category)) continue;

        const categoryObj = data[category];
        for (const item in categoryObj) {
            if (!categoryObj.hasOwnProperty(item)) continue;

            const itemObj = categoryObj[item];
            //console.log(`Caregory: ${categoryObj}.${itemObj.id}; Type of: ${typeof categoryObj}.${typeof itemObj}`)
            //console.log(data[category][obj])
            populate_dictionary(itemObj, references, dictionary)
        }
    
    }

    //console.log(`${JSON.stringify(dictionary, null, 2)}`)
    fs.writeFileSync(output_file, JSON.stringify(dictionary, null, 2))
}

function updateDictionary(metaData, changes) {
    //the dictionary to update
    const pathToDict = path.resolve(__dirname, metaData.dictFile)
    const dict = JSON.parse(fs.readFileSync(pathToDict, 'utf8'));

    console.log(changes)

    //what if i add a new item -> need to update all objects in the dictionary
    //if i delete an item -> reduce the refernces
    //update -> remove, and then add?
    for (const category in changes) {
        for (const change in category.Update) {
            
        }

    }
    
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
            changes = compare_controller(newData, oldData);
            fs.writeFileSync(changeLog, JSON.stringify(changes, null, 2));
            break;
        case 'getDict':
            const data_file = path.resolve(__dirname, args[1]);
            const references_file = path.resolve(__dirname, args[2])

            const data_obj = JSON.parse(fs.readFileSync(data_file, 'utf8'));
            const refrences_obj = JSON.parse(fs.readFileSync(references_file, 'utf8'));

            console.log(`Getting Dict for file ${data_file}`);
            getDictionary_controller(data_obj, refrences_obj, output_file = args[3] || './metadata/dictionary.json');
            break;
        case 'updateData':
            const dataFile = path.resolve(__dirname, args[1]);
            const dataToUpdate = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

            console.log(`Updating data file: ${dataFile}`);
            updateData(dataToUpdate);
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
    // console.log(`Process: ${process.argv[2]}`)
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
            if (process.argv.length < 5) {
                console.log('2 files required to compare, output file required');
                process.exitCode = 1;
                process.exit();
            }
            load(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
            break;
        case 'getDict':
            if (process.argv.length < 4) {
                console.log("Data file and references path expected");
                process.exitCode = 1;
                process.exit();
            }
            load(process.argv[2], process.argv[3], process.argv[4]);
            break;
        case 'updateData':
            if (process.argv.length < 2) {
                console.log("Need a data file to update");
                process.exitCode = 1;
                process.exit();
            }
            load(process.argv[2], process.argv[3]);
            break;
        default: 
            console.log("Invalid command")
            process.exitCode = 1;
            process.exit();
    }
}