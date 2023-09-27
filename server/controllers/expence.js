const expence = require('../models/Expense');
const User = require('../models/User');
const sequelize = require('../util/sqlconfig')

exports.exportData = async (req, res, next) => {
  let  t
  try {
    const { amount, description, desType } = req.body;
    const user = req.user;
    const currentUser = await User.findByPk(user.userId);
    t = await sequelize.transaction()


    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentTotalCost = currentUser.total_cost || 0; 
    const newTotalCost = currentTotalCost + parseInt(amount, 10); 
    await User.update({ total_cost: newTotalCost }, { where: { id: user.userId } },{transaction: t});
    const newExpense = await expence.create({
      amount: parseInt(amount, 10), 
      description: description,
      desType: desType,
      UserId: user.userId, 
    },{transaction: t});
    t.commit();
    console.log(newExpense); 
    res.status(201).json({ message: 'Expense created successfully' });
  } catch (error) {
    if(t){t.rollback()}
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.sendData = async (req, res, next)=> {
    try{
      let Expence = await expence.findAll({where:{userId: req.user.userId}})
        // .then(data => {
        //     console.log(data)
        //     res.json(data); 
        // })
        res.json(Expence)
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    
    };
}

exports.deleteData = async (req, res, next) => {
  let t 
  try {
    t = sequelize.transaction()
    const deleteId = req.params.id;
    const record = await expence.findByPk(deleteId);

    if (!record) {
        return res.status(404).json({ error: 'Record not found' });
    }

    const curreamount =  record.amount;

    const user = req.user;
    const currentUser = await User.findByPk(user.userId); 
    const newTotalCost = currentUser.total_cost - curreamount
    await User.update({ total_cost: newTotalCost }, { where: { id: user.userId } },{transaction: t});
  

    // Delete the record
    await record.destroy();

    res.status(204).send();
} catch (err) {
  if(t){
    t.rollback()
  }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
}

}
