const signName = document.getElementById('signname')
const signEmail = document.getElementById('signemail')
const signPassowrd = document.getElementById('signpassword')
const signBtn = document.getElementById('signin')


signBtn.addEventListener('click', async ()=>{
    const errmsg=document.getElementById('errormsg')
    const li= document.createElement('li')
    let name= signName.value;
    let email = signEmail.value;
    let password = signPassowrd.value;
    let obj = {
        name: name,
        email: email,
        password: password
    };
    try {
        await axios.post('http://localhost:3000/sign-in',obj);
        console.log('send successfully');
    } catch(err){
        li.innerHTML = `Email already exist`;
        errmsg.appendChild(li);

        // Automatically remove the error message after 3 seconds
        setTimeout(() => {
            errmsg.removeChild(li);
        }, 3000);
    }
    
})