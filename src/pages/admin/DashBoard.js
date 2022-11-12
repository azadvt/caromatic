import React from 'react'
import AdminLayout from '../../components/Layout/Admin/AdminLayout'

function Dashboard() {
  return (

    <>
    <AdminLayout>
    <div className="grid grid-cols-1 gap-5 m-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-2">
            <span className="text-gray-400">Total Users</span>
            <span className="text-lg font-semibold">100,221</span>
          </div>
          <div className="p-10 bg-gray-200 rounded-md"></div>
        </div>
        <div>
          <span className="inline-block px-2 text-sm text-white bg-zinc-300 rounded mr-6">4%</span>
          <span>from 2019</span>
        </div>
      </div>
      

      
    </div>
    </AdminLayout>
    </>
    

  
  )
}

export default Dashboard