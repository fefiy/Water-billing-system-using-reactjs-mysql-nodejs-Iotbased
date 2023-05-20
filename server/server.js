const express = require('express')
const cors = require('cors')
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const db = require("./connect")
const app = express()
app.use(express.json());
app.use(cookieParser()) 
app.use(helmet())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );


//  import routes

// const authRouter = require("./routes/auth")

// app.use("/api/user/", authRouter)

app.listen(3004 , ()=>{
    console.log("app is connected on this port")
})