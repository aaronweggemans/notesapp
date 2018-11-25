/*jshint esversion: 6 */
console.log('[database_interaction.js] starting');

var mysql = require('mysql');

/**
 * Creating the mysql connection
 */

var conn = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "rootroot",
    database : "db_tentamen"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Database has an connection!");
});

//functions to use
let addUser = (username, email, password) => {
    let sql = "INSERT INTO `users` (username, email, password) " +
        "VALUES ('" + username + "', '" + email + "', '" + password + "');";

    conn.query(sql, function (err, result) {
        console.log(result);
    });
};

module.exports = {
    //Don't forget to export new functions!!
    addUser,
};