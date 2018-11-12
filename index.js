const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port =3000

// use the body parser middleware to process json
app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.status(200).send({
        message:"Welcome earthling"
    });
});

app.post('/login', (req,res) =>{
    const username= req.body.username
    const email = req.body.email
    res.status(201).send({
        message:`hello ${username}`
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