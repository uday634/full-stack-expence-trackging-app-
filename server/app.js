const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const sequelize = require('./util/sqlconfig')
const expence = require('./models/userData')
const routUser = require('./routes/users')
const routExpence = require('./routes/expence')

const port = 3000;


const app = express();


app.use(cors())
app.use(bodyParser.json())

app.use('/user', routUser)

app.use('/expence', routExpence)

sequelize.sync()
    .then(result=>{
        app.listen(port,result=>{
            console.log(`server is running at port ${port}`)
        })
    })
    .catch(err=>{
        console.log(err)
    })






      