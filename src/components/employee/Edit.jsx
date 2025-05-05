import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDepartments } from '../../utils/EmployeeHelper'

const Edit = () => {
    const [employee, setEmployee] = useState({
        name:'',
        maritalStatus:'',
        designation:'',
        salary:'',
        department:''
    })
    const [departments, setDepartments] = useState(null)
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(()=>{
        const getDepartments =async ()=>{
        const department =await fetchDepartments()
        setDepartments(department)
        }
        getDepartments()
    },[])

    useEffect(()=>{
        const fetchEmployee = async()=>{
            try{
              const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
                headers:{
                  "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
              })
              if(response.data.success){
                const employee = response.data.employee
                setEmployee((prev)=>({...prev, 
                    name:employee.userId.name, 
                    maritalStatus:employee.maritalStatus,
                    designation:employee.designation,
                    salary:employee.salary,
                    department:employee.department._id
                }))
              }
            }catch(error){
              if(error.response && !error.response.data.success){
                alert(error.response.data.error)
              }
          } 
          }
          fetchEmployee()
    },[])

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };
    

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/employee/${id}`, 
                employee,
                {
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success){
                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

  return (
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Name */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input type='text' name='name' placeholder='Insert Name'
                     className='mt-1 p-2 block w-full border border-gray-300 rounded-sm'
                     value={employee.name}
                     onChange={handleChange}
                     required />
                </div>
               
                {/* Martial Status */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Marital Status</label>
                    <select name="maritalStatus"
                     onChange={handleChange}
                     value={employee.maritalStatus}
                    placeholder="Enter Martial Status" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                        <option value="">Select Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>

                {/* Designation */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Designation</label>
                    <input type='text' name='designation' placeholder='Enter Designation'
                     onChange={handleChange}
                     value={employee.designation}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                </div>

                {/* salary */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Salary</label>
                    <input type='number' name='salary' placeholder='Enter Salary'
                    onChange={handleChange}
                    value={employee.salary}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
                </div>

                {/* Department */}
                <div className='col-span-2'>
                    <label className='block text-sm font-medium text-gray-700'>Department</label>
                    <select name='department' 
                     onChange={handleChange}
                     value={employee.department}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                        <option value="">Select Department</option>
                        {departments.map((dep)=>(
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div> 

            </div>
            <button type='submit' className='w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md'>
                Edit Employee
            </button>
        </form>
    </div>
    ) : <div>Loading...</div>}</>
  )
}

export default Edit