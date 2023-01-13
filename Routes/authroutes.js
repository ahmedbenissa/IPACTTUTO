const exp=require('express')
const route=exp.Router()
const customers=require('../Entities/Customers')
const mongoose = require('mongoose')
var bcrypt=require('bcryptjs')
var CryptoJS=require('crypto-js')
var jwt=require('jsonwebtoken')
const session = require('../Entities/session')
route.post('/register',async(req,res)=>{
    var salt = bcrypt.genSaltSync(10);
    /*FullName:String,
    Email:String,
    Password:String,
    Phone_number:Number,
    gender:String,
    address:String,
    Birthdate:Date*/
customers.create({
    FullName:req.body.FullName,
    Email:req.body.Email,
    Password:bcrypt.hashSync(req.body.Password, salt),
    Phone_number:req.body.Phone_number,
    gender:req.body.gender,
    address:req.body.address,
    Birthdate:req.body.Birthdate
},(err,docs)=>{
    if(err){
        res.send(err)
        
    }
    else res.send(docs)
})
})
route.post('/login/:email/:password',async(req,res)=>{
    var salt = bcrypt.genSaltSync(10);
    
customers.find({  
    Email:req.params.email,
    //Password: bcrypt.hashSync(req.params.password, salt)
},(err,docs)=>{
    if(err){
        res.send(err)
        
    }
    else { 
         console.log(docs)
         if(docs.length==0)
         {
            res.send('not found')
         }
         else if(docs.length!=0)
         {
          
         
       if( bcrypt.compareSync(req.params.password, docs[0].Password)==true)
       {
        var hash = CryptoJS.SHA256(req.params.email+req.params.password)
        
        let jwtSecretKey = hash.toString(CryptoJS.enc.Base64);
        
        let data = {
            time: Date(),
            Email:docs[0].Email,
            Username:docs[0].FullName,
           // iss:hash
        }
        console
        const token = jwt.sign(data, jwtSecretKey);
        console.log(token)
        // var token= hash.toString(CryptoJS.enc.Base64)
        res.send(token)
        console.log(data)
        session.create({
            User:data.Username,
            parsed_token:token,
            logged_in:new Date(Date.now()),
            expires_in:new Date(Date.now()+8*3600000)
        })
       }
       else 
       {
        console.log(bcrypt.compareSync(req.params.password, docs[0].Password))
        res.send('incorrect credentials')
       }
    }
}
})
})
route.get('/auth/',async(req,res)=>{
    session.find({parsed_token:req.body.token},(err,docs)=>{
        if(err)
         res.send(err)
         else {
            res.send(docs[0])
         }
    })

})
module.exports=route