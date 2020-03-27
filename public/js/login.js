import axios from 'axios';
import {showAlert} from './alerts'

export const login = async (email, password) => {
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
           showAlert('sucess','Logged in successfuly!');
           window.setTimeout(()=>{
               location.assign('/');
           }, 1500);
       }

      console.log(res);
    } catch(err) {
        showAlert('error', err.response.data.message);
    }
};

export const logout = async () => {
    try {
        const res = await axios ({
            method: 'GET',
            url:'http://120.0.0.1:3001/api/v1/users/logout'
        });

        if(res.data.status = 'sucess') location.reload(true);
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.')
    }
};
