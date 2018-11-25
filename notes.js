/*jshint esversion: 6 */
console.log('[notes.js] starting');

/**
 * Requiring Filesystem
 */
const fs = require('fs');

/**
 * Creating function for CRUD actions on the notes-data file
 * @returns {*}
 */
let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    /*
    if (!fs.existsSync('notes-data.json')) {
        var dict =
            [
                {
                    "title": title,
                    "body": body
                },
            ];
        fs.writeFileSync('notes-data.json', JSON.stringify(dict));
    }
    else {
        fs.readFile('notes-data.json', function (err, data) {
            var inc = {
                "title": title,
                "body": body,
            };

            var insert = JSON.stringify(inc);

            fs.appendFile("notes-data.json", insert, 'utf8', function (err) {
                if (err) throw err;
                console.log("Data is appended");
            })
        });
    }
     */
};

let checker = (title) => {
    let data = fs.readFileSync('notes-data.json');
    let finder = JSON.parse(data);

    if (finder[0].title == title) {
        new Error;
    }
};

let getAll = () => {
    console.log('[notes.js => getAll] Get All notes');
};

let addNote = (title, body) => {
    checker(title);

    let notes = fetchNotes();

    let note = {
        title,
        body
    };

    notes.push(note);

    saveNotes(notes);

    return note;
};

let getNote = (title) => {
    console.log('[notes.js => getNote] ', title);
};

//GODVERDOMME!
let delNote = (title) => {
    let notes = fetchNotes();

    for (var i = 0; i < notes.length; i++) {
        if (notes[i]["title"] == title) {
            delete notes[i];
            notes.splice(i, i); // => [Object]
            saveNotes(notes);
        }
    }
};


module.exports = {
    saveNotes,
    getAll,
    addNote,
    getNote,
    delNote,
    checker,
};