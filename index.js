const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt')
const decoder = require('jwt-decode')
const port =3000

// use the body parser middleware to process json
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.status(200).send({
        message:"Welcome earthling"
    });
});

const users = []

app.post('/login', (req,res) =>{
    if (!req.body.username || !req.body.email){
        res.status(400).send({
            message:"invalid request body"
        });
        return;
    }
    const username= req.body.username
    const email = req.body.email
    const user = {
        "username":username,
        "email":email
    }
    users.push(user)
    // generate token when logging in a user
    const token = jwt.sign({
        sub:user.username,
        email:user.email
    }, "myKey", {expiresIn: "3 hours"})
    res.status(201).send({
        message:`hello ${username}`,
        token: token
    });
})
const jwtCheck = expressjwt({
    secret:"myKey"
});
// protected route that can only be accessed by logged in users
app.get('/user',jwtCheck,(req,res) =>{
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)   
    }
})

// route to decode the token
// returns the decoded token
app.post('/decode', jwtCheck, (req,res)=>{
    const token = req.headers.authorization.substr(7)
    const decodedToken = decoder(token)
    res.status(200).send({
        token:decodedToken
    });
})

app.get("*", (req,res) =>{
    res.status(404).send({
        message:"Ooops, no page found"
    });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})