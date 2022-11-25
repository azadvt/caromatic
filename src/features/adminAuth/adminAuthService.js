import axios  from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const API_URL_ADMIN ='api/admin/'

//Login user
const adminLogin = async (adminData) => {
    let response
    if(adminData?.userName)  {       
         response = await axios.post(API_URL_ADMIN+'login',adminData) 
    }
    if(response?.data) {
        if(response.data.name==="admin"){
            localStorage.setItem('admin',JSON.stringify(response.data))
        }
    }
    return response.data
}
const adminLogout = () => {
    localStorage.removeItem('admin')
}




const authAdminService = {
    adminLogin,adminLogout
}

 export default authAdminService