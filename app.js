/*jshint esversion: 6 */
console.log('[app.js] included');

/**
 * Requires all the data functions
 * Using filesystem for creating files and express to create server
 * Using handlebars to see views
 */
const fs = require('fs');
const notes = require('./notes.js');
const _ = require('lodash');
const bodyParser = require("body-parser");
const exphbs  = require('express-handlebars');
const express = require('express');
const app = express();
const mysql = require('mysql');
const db_interaction = require('./database_interaction.js');

/**
 * Creating the mysql connection
 */

let conn = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "rootroot",
    database : "db_tentamen"
});

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/**
 * Uses to make it possible to link stylesheets and javascript code
 * Into the handlebars views
 */
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

/**
 * Uses to create url requests
 */
fs.readFile('notes-data.json', 'utf8', function (err, data) {
    let query = "SELECT * FROM `users`";

    conn.query(query, function (err, result) {
        app.get('/', function (req, res) {
            let parser = JSON.parse(data);
            res.render('index', { title: "Intro pagina", jsondata: parser, users: result});
        });
    });
});

app.get('/add_note', function (req, res) {
    res.render('add_notes', { title: "Notes pagina"});
});

app.get('/delete/notes/:title', function (req, res) {
    // res.send(req.params.title);
    title = req.params.title;

    notes.delNote(title);

    res.redirect('/');
});

app.get('/edit/notes/:title/:body', function (req, res) {
    let rTitle = req.params.title;
    let rBody = req.params.body;

    res.render('edit_notes', {title : "edit Pagina", titleText : rTitle, bodyText: rBody});
});

app.get('/edit/user/:username/:email', function (req, res) {
    let rUsername = req.params.username;
    let rEmail = req.params.email;

    res.render("edit_user", {title: "Edit user", username: rUsername, email: rEmail});
});

app.get('/delete/user/:username', function (req, res) {
    let username = req.params.username;

    conn.query("DELETE FROM `users` WHERE `username` = '" + username + "' ");
    res.redirect('/');
});

app.get('/add_user', function (req, res) {
    res.render('add_user', {title: "Add User"});
});

app.post('/add_note', function (req, res) {
    let title = req.body.title;
    let body = req.body.body;
    notes.addNote(title, body);

    res.redirect("/add_note");
});

app.post('/add_user', function (req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    db_interaction.addUser(username, email, password);
    res.redirect("/add_user");
});

/**
 * Listens to the given port number
 */
app.listen(4000);
