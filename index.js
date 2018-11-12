const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
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

app.get('/user', (req,res) =>{
    res.status(200).send(users)
})

app.get("*", (req,res) =>{
    res.status(404).send({
        message:"Ooops, no page found"
    });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})