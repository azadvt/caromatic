import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { blockUser, getUsers ,reset } from '../../features/users/userSlice'
import swal from 'sweetalert';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AdminLayout from "../../components/Layout/Admin/AdminLayout";

function UserManagement() {

    const dispatch = useDispatch()
    const {userData,isLoading,isError,isSuccess,message } = useSelector(state => state.users)
  
    useEffect(() => {
        if (isError) {
          alert(message)
        }
        if(isSuccess){
            alert(message.message)
        }
        dispatch(getUsers())
        return () => {
          dispatch(reset())
        }
      }, [dispatch, message, isError])
    console.log(userData);
    if(isLoading) {
        <LoadingSpinner/>
    }
    const unBlock = (id)=>{
        swal({
            title: "Are you sure to UnBlock this User?",
            text: "The user will be allowed to website",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(blockUser(id)).then(() => {
                    swal("User was unblocked Successfully", {
                        icon: "success",
                      });
                })
            }
          });

        
    }
    const block = (id)=>{
        swal({
            title: "Are you sure to Block this User?",
                text: "The user will be forbidden from login his account",
                icon: "warning",
                buttons: true,
                dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(blockUser(id)).then(() => {
                    swal("User was blocked Successfully", {
                        icon: "success",
                      });
                })
            }
          });

        
    }
 

 
  return (
   
<>
<AdminLayout>
<div className="overflow-x-auto relative shadow-md sm:rounded-lg m-8">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    User name
                </th>
                <th scope="col" className="py-3 px-6">
                    Email
                </th>
                <th scope="col" className="py-3 px-6">
                    phone
                </th>
                <th scope="col" className="py-3 px-6">
                   Action {/* Age */}
                </th>
                
            </tr>
        </thead>
        <tbody>
            {    userData?.map((user)=>(
                 <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                 <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {user.name ?user.name : 'Not Provided'}
                 </th>
                 <td className="py-4 px-6">
                     {user.email ? user.email : 'Not Provided'}
                 </td>
                 <td className="py-4 px-6">
                     {user.phone ? user.phone : 'Not Provided'}
                 </td>
                 <td className="py-4 px-6">
                    {user.isBlocked ? <button onClick={()=>unBlock(user._id)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Unblock</button> 
                    :<button type="button" onClick={()=>block(user._id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >Block</button>}
                 </td>
                 
             </tr>
             
    ))}
           
        </tbody>
    </table>
    
</div>
</AdminLayout>
</>

  )
}

export default UserManagement