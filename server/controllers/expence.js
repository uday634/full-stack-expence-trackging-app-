const expence= require('../models/Expense')
const User = require('../models/User')


exports.exportData = async (req, res, next) => {
  try {
    const { amount, description, desType } = req.body;
    const user = req.user; // Assuming you can access user information this way
    console.log(user.userId)
    // // Retrieve the current total_cost for the user
    const currentUser = await User.findByPk(user.userId);
    const currentTotalCost = currentUser.total_cost 

    // // Calculate the new total_cost by adding the amount
    const newTotalCost = currentTotalCost + amount;

    // // Update the total_cost for the user
    await User.update({ total_cost: newTotalCost }, { where: { id: user.userId } });

    // Create a new expense record with the updated total_cost
    const newExpense = await expence.create({
      amount: amount,
      description: description,
      desType: desType,
      total_cost: newTotalCost, // Update total_cost with the new value
      UserId: user.UserId, // Corrected to use 'UserId' with uppercase 'U'
    });

    console.log(newExpense); // Log the newly created expense

    res.status(201).json({ message: 'Expense created successfully' });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.sendData = (req, res, next)=> {

    expence.findAll({where:{userId: req.user.userId}})
        .then(data => {
            console.log(data)
            res.json(data); // Send data as JSON response
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

exports.deleteData = async (req, res, next) => {
    try {
        const deleteId = req.params.id;
        const record = await expence.findByPk(deleteId);

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        await record.destroy();
        res.status(204).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
