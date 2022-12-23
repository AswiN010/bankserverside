/// import dataService file from serves folder 
const dataservice = require('./service/dataService')

// impoport jwtwebtoken
const jwt = require('jsonwebtoken')

///  import express
const express = require('express')


// create an app
const app = express()
app.use(express.json())
// to convert json data to javascript


//// MIddelwares  for verify the token

const jwtmiddleware = (req, res, next) => 
    {
    console.log("roter specific middleware");
   try 
      {  
      const token = req.headers["access-token"]
      const data= jwt.verify(token,"secretkey123")
      console.log(data);
      next()
      }
    catch
       {
             res.status(422).json
             ({statuscode:422,status:false,message:"login fisrt" })
       }
    }

// request

// REGISTER
app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statusCode).json(result)
})

// LOGIN


//login
app.post('/login', (req, res) => 
  { const result = dataservice.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)})

//deposit
app.post('/deposit',jwtmiddleware, (req, res) => {
    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})

//withdraw
app.post('/withdraw',jwtmiddleware, (req, res) => {
    const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})

//withdraw

app.post('/gettransaction',jwtmiddleware, (req, res) => {
    const result = dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)

})


// //request 
// //GET -- to acess data-----------------------------------------
// app.get('/',(req,res)=>{res.send('get method checking')})

// //POST --- to data to database---------------------------------
// app.post('/',(req,res)=>{res.send('post method checking')})

// //DELETE--------------------------------------------------------
// app.delete('/',(req,res)=>{res.send('delete method checking')})

// //PUT  --- to update-------------------------------------------- 
// app.put('/',(req,res)=>{res.send('put method checking')})

// //PATCH --------------------------------------------------------
// app.patch('/',(req,res)=>{res.send('patch method checking')})





// set port number
   app.listen(3000, () => { console.log("server start at a port number 3000"); })