const mongoose=require('mongoose')
const CustomerSchema=  mongoose.Schema(
   { 
   FullName:String,
    Email:String,
    Password:String,
    Phone_number:Number,
    gender:String,
    address:String,
    Birthdate:Date
   })
module.exports=mongoose.model('customers',CustomerSchema)