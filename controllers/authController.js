const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.register = async (req,res)=>{
    
    const {name,email, password } = req.body
    try {
        let user = await User.findOne({email})
        if(user){
            
            return res.status(200).json({statusCode:409,msg:"User already exists"})
        }
        user = new User({name,email,password})
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()
        const payload = { user:{id:user.id}}
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if (err){
                console.log(err)
                throw err
            } ;
            console.log(token)
            res.json({token})
        })
      
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')       
    }
}

exports.login = async (req,res)=>{
    const {email, password } = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(200).json({statusCode:404,msg:"User does not exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(200).json({statusCode:400,msg:"Invalid password"})
        }
        const payload = { user: { id: user.id}}
        jwt.sign(payload,process.env.JWT_SECRET,(err,token)=>{
            if (err) throw err;
            res.json({token})
        })
      
    } catch (error) {
        res.status(500).send('Server error')       
    }
}
