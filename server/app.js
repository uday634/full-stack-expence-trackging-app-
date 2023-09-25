const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/sqlconfig'); // Use sequelize instance
const Expense = require('./models/Expense');
const Order = require('./models/orders');
const User = require('./models/User');
const routUser = require('./routes/users');
const routExpence = require('./routes/expence');
const routpreiumuser = require('./routes/premiumuser')


const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/user', routUser);
app.use('/expence', routExpence);
app.use('/premium',routpreiumuser);





// Define associations here
Expense.belongsTo(User);
User.hasMany(Expense);

Order.belongsTo(User);
User.hasMany(Order);

sequelize.sync() // Use sequelize instance for syncing
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
