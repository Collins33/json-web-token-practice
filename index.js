const express = require('express')
const app = express()
const port =3000

app.get('/', (req,res)=>{
    res.status(200).send({
        message:"Welcome earthling"
    });
});

app.get("*", (req,res) =>{
    res.status(404).send({
        message:"Ooops, no page found"
    });
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})