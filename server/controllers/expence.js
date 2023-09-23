const expence = require('../models/userData')

exports.expenceData = (req, res, next)=>{
    console.log(req.body)
    let amount = req.body.amount;
    let description = req.body.description;
    let desType = req.body.desType;

    expence.create({
        amount: amount,
        description: description,
        desType: desType
    })
        .then(result=>console.log(result))
        .catch(err=>console.log(error))
}