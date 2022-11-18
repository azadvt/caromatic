import axios  from "axios";
axios.defaults.baseURL = 'http://localhost:5000';

const API_URL_USER = 'api/users/'


const stripeCheckout = async (bookingData,token)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL_USER}create-checkout-session`,bookingData,config)
    return response.data
}

//Add booking
const addBooking = async (bookingData,token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_USER+'add-booking',bookingData,config)
    return response.data
}

const getBookings = async(id,token)=> {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL_USER}get-bookings?userId=${id}`,config)
    return response.data    
}

const deleteBooking = async (id,token)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL_USER}delete-booking?id=${id}`,config)
    return response.data

}


const bookingService ={
    addBooking,getBookings,deleteBooking,stripeCheckout
}

export default bookingService