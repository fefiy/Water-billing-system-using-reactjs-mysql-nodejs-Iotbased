const mysql = require("mysql");

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"water-managment"
})


module.exports = db