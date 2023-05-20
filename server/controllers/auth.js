const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { db } = require("../connect")


const register = (req, res) => {
   //CHECK USER IF EXISTS
 
   const q = "SELECT * FROM users WHERE username = ?";
 
   db.query(q, [req.body.username], (err, data) => {
     if (err) return res.status(500).json(err);
     if (data.length) return res.status(409).json("User already exists!");
     const salt = bcrypt.genSaltSync(10);
     const hashedPassword = bcrypt.hashSync(req.body.password, salt);
 
     const q =
       "INSERT INTO users (`name`,`email`,`password`,`role_id`, `mac_address`) VALUE (?)";
 
     const values = [
       req.body.username,
       req.body.email,
       hashedPassword,
       req.body.name,
       req.body.role_id,
       req.body.mac_address
     ];

     db.query(q, [values], (err, data) => {
       if (err) return res.status(500).json(err);
       return res.status(200).json("User has been created.");
     });
   });
 };




// const logout = (req, res) => {
//   res.clearCookie("accessToken", {
//     secure: true,
//     sameSite: "none"
//   }).status(200).json("User logout successfuly")
// }


// const accessToken = (req, res)=>{
//    console.log(" aceess token iw=s working" )
//    const token = req.cookies.accessToken;
//    if(!token){
//       res.json({isTrue:false})
//    }else{
//       res.json({isTrue:true})
//    }
// //   res.json(req.cookie.accessToken)
// }
module.exports={
    register,
}