const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = mongoose.model('User')
const bcrypt = require('bcrypt')



router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){

        return res.status(404).json({error:"Please fill up all fields"})
    }
    User.findOne({email:email}).then(data=>{
        if(data){
          return  res.json({error:"user already exists"})
        }
        bcrypt.hash(password,12).then(hashPassword=>{

            const user = new User({
                name,
                email,
                password:hashPassword
            })

            user.save().then(savedUser=>{
                res.status(200).json({message:"signup sucessful"})

            }) .catch(err=>{
                console.log(err)
            })
            
        })
       
        
    })
    
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(404).json({error:"please fill up all fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
           return res.status(404).json({error:"Invalid email or password"}) // email checking
        }
        bcrypt.compare(password,savedUser.password).then(data=>{
            if(!data){
                return res.status(404).json({error:"Invalid email or password"}) // passowrd checking
            }
        else{
            res.status(200).json({message:"Login successful"})
        }
        }) .catch(err=>{
            console.log(err)
        })
            
    }) .catch(err=>{
        console.log(err)
    })
})

module.exports = router