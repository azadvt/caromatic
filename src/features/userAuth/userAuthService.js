import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000';


const API_URL_USER = 'api/users/'
//Register user
const signup = async (userData) => {
    const response = await axios.post(API_URL_USER + 'signup',userData)
    console.log(response);
    if(response?.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//Login user
const login = async (userData) => {
   const response ={}
    if(userData)  {       
        response.data = await axios.post(API_URL_USER+'login',userData)
        console.log(response.data);
    }
    if(response?.data?.data) {
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data.data))
        }
        
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}



const userAuthService = {
    signup,login,logout
}

 export default userAuthService