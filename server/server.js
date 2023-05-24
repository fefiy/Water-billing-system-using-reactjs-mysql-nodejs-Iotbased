const express = require('express')
const cors = require('cors')
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json());
app.use(cookieParser()) 
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(
    cors({
      origin:true,
    })
  );
//  import routes

const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")

app.use("/api", authRouter)
app.use("/api", userRouter)

app.listen(3004 , ()=>{
    console.log("app is connected on this port")
})