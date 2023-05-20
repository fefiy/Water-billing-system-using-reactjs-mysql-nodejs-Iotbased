const mysql = require("mysql");

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"water-managment"
})

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db