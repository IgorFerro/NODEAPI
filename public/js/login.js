

const login = async (email, password) => {
    try{
        const res = await axios({
            method: 'POST',
            url: 'http://120.0.0.1:3001/api/v1/users/login',
            data: {
                email,
                password
            } 
        });

       if(res.data.status === 'sucess'){
           alert('Logged in successfuly!');
           window.setTimeout(()=>{
               location.assign('/');
           }, 1500);
       }

      console.log(res);
    } catch(err) {
        alert(err.response.data.message);
    }
};

document.querySelector('.form').addEventListener('submit', e =>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
})
