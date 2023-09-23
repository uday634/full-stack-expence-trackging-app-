const logEmail = document.getElementById('logemail');
const logPassword = document.getElementById('logpassword'); // Fixed typo
const logBtn = document.getElementById('login');




// Logic for the log in
logBtn.addEventListener('click', async () => {
    let email = logEmail.value;
    let password = logPassword.value; // Fixed typo
    let obj = {
        email: email,
        password: password
    };
    try {
        await axios.post('http://localhost:3000/log-in', obj);
        console.log('Send successfully');
    } catch (err) {
        errmsg.textContent = "Can't find the user";
        setTimeout(() => {
            errmsg.textContent = ''; 
        }, 3000);
    }
});
