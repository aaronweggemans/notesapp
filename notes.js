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

/**
 * Saves all the notes
 * @param notes
 */
let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

/**
 * Checks data on title
 * @param title
 */
let checker = (title) => {
    let data = fs.readFileSync('notes-data.json');
    let finder = JSON.parse(data);

    if (finder[0].title == title) {
        new Error;
    }
};

/**
 * Niks
 */
let getAll = () => {
    console.log('[notes.js => getAll] Get All notes');
};

/**
 * Adds an title and an body to the array
 * @param title
 * @param body
 * @returns {{title: *, body: *}}
 */
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

/**
 * Console log
 * @param title
 */
let getNote = (title) => {
    console.log('[notes.js => getNote] ', title);
};

/**
 * Removes an line from the notes.json file
 * @param title
 */
let delNote = (title) => {
    let notes = fetchNotes();

    for (var i = 0; i < notes.length; i++) {
        if (notes[i]["title"] == title) {
            notes.splice(i, i); // => [Object]
            saveNotes(notes);
        }
    }
};

/**
 * Exports the data
 * @type {{
 * saveNotes: saveNotes,
 * getAll: getAll,
 * addNote: (function(*=, *): {title: *, body: *}),
 * getNote: getNote,
 * delNote: delNote,
 * checker: checker}}
 */
module.exports = {
    saveNotes,
    getAll,
    addNote,
    getNote,
    delNote,
    checker,
};