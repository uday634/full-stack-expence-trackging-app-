const fs = require('fs')
const path = require('path')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const sequelize = require('./util/sqlconfig'); // Use sequelize instance
const Expense = require('./models/Expense');
const Order = require('./models/orders');
const User = require('./models/User');
const forgotPasswordRequest = require('./models/ForgotPasswordRequest')
const routUser = require('./routes/users');
const routExpence = require('./routes/expence');
const routpreiumuser = require('./routes/premiumuser')
const routerforgot = require('./routes/password')


const port = 3000;

const app = express();


require("dotenv").config();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags : 'a'})

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined',{stream: accessLogStream}))
app.use(helmet());
app.use(compression())

app.use('/user', routUser);
app.use('/expence', routExpence);
app.use('/premium',routpreiumuser);
app.use('/password', routerforgot)



// Define associations here
Expense.belongsTo(User);
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

forgotPasswordRequest.belongsTo(User);
User.hasMany(forgotPasswordRequest)

sequelize.sync() // Use sequelize instance for syncing
.then(() => {
        app.listen(process.env.PORT || port, () => {
            console.log(`Server is running at port ${port}`);
           
            
        });
    })
    .catch(err => {
        console.log(err);
    });
