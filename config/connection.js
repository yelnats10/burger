var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 8080,
  host: "localhost",
  user: "root",
  password: "fzappaappazf"",
  database: "burger_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
