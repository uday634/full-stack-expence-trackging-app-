const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const sequelize = require('./util/sqlconfig')
const signData = require('./models/sqlconfig')
const port = 3000;


const app = express();


app.use(cors())
app.use(bodyParser.json())

app.post('/sign-in', (req, res, next)=>{
    console.log(req.body)
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    signData.create({
        name:name,
        email:email,
        password:password,
    })
        .then((result)=>{
            console.log(result)
        })
        .catch(err=>{
            console.error(err);
            res.status(500).json({ message: 'Error creating user' });
        })
})





sequelize.sync()
    .then(result=>{
        app.listen(port,result=>{
            console.log(`server is running at port ${port}`)
        })
    })
    .catch(err=>{
        console.log(error)
    })