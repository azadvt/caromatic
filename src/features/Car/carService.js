import axios  from "axios";
axios.defaults.baseURL = 'http://localhost:5000';

const API_URL_ADMIN ='api/admin/'

//Add Car
const addCar = async (carData,token) => {
    console.log(token,carData);
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_ADMIN+'add-car',carData,config)
    return response.data
}

const getCars = async(token)=> {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL_ADMIN+'get-cars',config)
    return response.data    
}

const deleteCar = async (id,token)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL_ADMIN}delete-car?id=${id}`,config)
    return response.data

}


const carService ={
    addCar,getCars,deleteCar
}

export default carService