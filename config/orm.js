// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


var orm = {
  selectAll: function (tableName, cb) {
    var queryString = "SELECT * FROM " + tableName + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function (tableName, columns, columnValues, cb) {
    var queryString = "INSERT INTO " + tableName;

    queryString += " (";
    queryString += columns.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(columnValues.length);
    queryString += ") ";
console.log(queryString);
    connection.query(queryString, columnValues, function (err, result) {
      if (err) {
        throw err;
      }

    console.log(result);
      cb(result);
    });
  },
  updateOne: function (tableName, colValuObj, condition, cb){
    var queryString = "UPDATE " + tableName;

    queryString += " SET ";
    queryString += objToSql(colValuObj);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model .
module.exports = orm;