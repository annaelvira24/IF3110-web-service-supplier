let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ws-supplier"
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;