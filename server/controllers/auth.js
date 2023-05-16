const bcrypt = require("bcryptjs")
const { QueryTypes } = require('sequelize');
const {Users, sequelize} = require('../models')
const jwt = require("jsonwebtoken")


const register = async (req, res)=>{
    // check the user is exist
     const user = await Users.findOne({where:{ userName : req.body.userName } })

     if(user != null){
     return  res.status(409).json( "user already Exist")
         
     }else{
        var salt =  bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync( req.body.password , salt);
        const addedUser = {
            userName: req.body.userName,
            email : req.body.email,
            firstname : req.body.firstname,
            hashPassword: hash
        }
       
        await Users.create(addedUser)
        return  res.status(200).json("user created sucessfuly")
     }
    
    
}

const allUser = async(req, res)=>{
    const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT })
    return res.json(users)
}

 const login = async(req, res)=>{
 const user = await Users.findOne({where:{userName: req.body.userName}})
  if(user != null){
     if(bcrypt.compareSync(req.body.password, user.hashPassword)){
        const  {hashPassword , ...other } = user
         const sended = {
            userName: user.userName,
            profilePic:user.profilePic,
            email: user.email,
            firstname: user.firstname,
            city:user.city,
            coverPic:user.coverPic,
            website:user.website,
            id:user.user_id
         }
        const token = jwt.sign({id: user.user_id}, "secretkey")

        res.cookie("accessToken", token,{
            httpOnly:true,
        }).status(200).send(sended)

        //return res.json("user successfuly registered")
     }else{
        return res.status(401).json("wrong password")
     }
  }else{
    return res.status(404).json("user doen't exist")
  }
    
}

const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User logout successfuly")
}


const accessToken = (req, res)=>{
   console.log(" aceess token iw=s working" )
   const token = req.cookies.accessToken;
   if(!token){
      res.json({isTrue:false})
   }else{
      res.json({isTrue:true})
   }
//   res.json(req.cookie.accessToken)
}
module.exports={
    register,
    login,
    allUser,
    logout,
    accessToken
}