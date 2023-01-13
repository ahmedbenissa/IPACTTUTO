const mongoose = require('mongoose')
const SessionSchema= new mongoose.Schema(
    {
        User :{
            type:mongoose.Schema.Types.String,
            ref:'customers'
        },
        parsed_token:String,
        logged_in:Date,
        expires_in:Date
    }
)
module.exports=new mongoose.model('sessions',SessionSchema)