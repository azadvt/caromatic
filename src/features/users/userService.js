import axios  from "axios";
axios.defaults.baseURL = 'http://localhost:5000';

const API_URL_ADMIN ='api/admin/'

const getUsers = async(token)=> {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_ADMIN+'get-users',config)
    return response.data    
}

const blockUser = async(id,token)=> {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.patch(`${API_URL_ADMIN}block-user?id=${id}`,config)
    return response.data    
}

const userService ={
    getUsers,blockUser
}

export default userService