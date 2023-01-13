const express = require('express')
const app=express()
const mongoose=require("mongoose")
app.use(express.json())
const path = require('path');
const port= 8902
const customerRoutes=require('./Routes/authroutes')
app.use('/customers',customerRoutes)
/*const carRoutes=require('./Routes/CarRoutes')
const customerRoutes=require('./Routes/CustomerRoutes')
const RentRoutes=require('./Routes/RentRoutes')
const ownerRoutes=require('./Routes/AgencyownersRoutes')
const AgencyRoutes=require('./Routes/AgencyRoutes')
app.use('/upload_routes',require('./Routes/uploadroutes'))
app.use('/cars',carRoutes)
app.use('/rents',RentRoutes)
app.use('/customers',customerRoutes)
app.use('/owners',ownerRoutes)
app.use('/agencies',AgencyRoutes)*/
mongoose.connect('mongodb+srv://ahmed:ahmed@cluster0.iaanx.mongodb.net/IPACT?retryWrites=true&w=majority').then((res)=>{
  console.log("connected to mongodb+srv://ahmed:ahmed@cluster0.iaanx.mongodb.net/IPACT?retryWrites=true&w=majority")
}).catch((err)=>{
  console.log("not connected")
})


app.listen(port, async() => {
    console.log(`http://localhost:${port}`) 
  })