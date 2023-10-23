const mysql = require("mysql");

const db = mysql.createConnection({
  host:process.env.MYSQLHOST,
  user:process.env.MYSQLUSER,
  password:process.env.MYSQLHOST,
  database:process.env.MYSQLDATABASENAME
})

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db



// const mysql = require("mysql");
// const dotenv = require("dotenv");
// dotenv.config();
// const urlDb = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
// const db = mysql.createConnection(urlDb);

// db.connect((err) => {
//   if (err) {
//     console.error("Failed to connect to the database:", err);
//     return;
//   }
//   console.log("Connected to the database");
// });

// module.exports = db;
