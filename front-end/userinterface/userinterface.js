// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const amount = document.getElementById('user-amount');
    const description = document.getElementById('user-description');
    const desType = document.getElementById('des-type');
    const addbtn = document.getElementById('addbtn');
    const data = document.getElementById('data');

    // Function to add an expense
    async function addExpense() {
        const useramount = amount.value;
        const userdes = description.value;
        const userdesType = desType.value;
        let li = document.createElement('li')

        li.innerHTML =`Rs.${useramount} - ${userdes} - ${userdesType}  <button class="edit" id="edit">Edit</button><button class="delete" id="delete">delete</button>`
        data.appendChild(li)
        const obj = {
            amount: useramount,
            description: userdes,
            desType: userdesType
        };

        try {
            const result = await axios.post('http://localhost:3000/expence/addExpence', obj);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }

    // Event listener for the "Add Expense" button
    addbtn.addEventListener('click', addExpense);

    // Function to retrieve and display expenses
    async function getExpenses() {
        try {
            const response = await axios.get('http://localhost:3000/expence/getExpence');
            const expenses = response.data;

            expenses.forEach(expense => {
                const { amount, description, desType } = expense;
                
                const li = document.createElement('li');
                li.textContent = `Rs.${amount} - ${description} - ${desType}`;
                
                const editButton = document.createElement('button');
                editButton.className = 'edit';
                editButton.textContent = 'Edit';

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete';
                deleteButton.textContent = 'Delete';

                li.appendChild(editButton);
                li.appendChild(deleteButton);

                data.appendChild(li);
            });
        } catch (err) {
            console.log(err);
        }
    }
    
    // Call the function to retrieve and display expenses
    getExpenses();
});