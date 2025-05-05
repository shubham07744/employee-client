import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'

const List = () => {

    const [employees, setEmployees] = useState([])
     const[depLoading, setEmpLoading] = useState(false)
     const[filterdemployee, setFilteredEmployees] = useState([])


    const fetchEmployees = async()=>{  
        setEmpLoading(true)
        try{
          const response = await axios.get('https://employee-server-one.vercel.app/api/employee',{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.success){
            let sno = 1;
            const data = response.data.employees.map((emp) => (
              {
                _id: emp._id,
                sno: sno++,
                dep_name: emp.department.dep_name,
                name:emp.userId.name,
                dob:new Date(emp.dob).toLocaleDateString(),
                profileImage:<img width={40} className='rounded-full'  src={`https://employee-server-one.vercel.app/${emp.userId.profileImage}`} />,
                action: ( <EmployeeButtons _id={emp._id}/>)
              }));
              setEmployees(data) 
              setFilteredEmployees(data)
          }
        }catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
      } finally{
        setEmpLoading(false)
      }
      }

      useEffect(()=>{
      fetchEmployees()
    },[])

    const handleFilter=(e)=>{
        const records = employees.filter((emp)=>(
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records)
    }

  return (
    <div className='p-6'>
        <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type='text' placeholder='Search By Emp Name' className='px-4 py-0.5 border' onChange={handleFilter} />
        <Link to={'/admin-dashboard/add-employee'} className='px-4 py-1 bg-teal-500 rounded text-white'>Add New Employee</Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={Columns} data={filterdemployee} pagination />
      </div>
    </div>
  ) 
}

export default List