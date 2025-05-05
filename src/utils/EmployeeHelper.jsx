import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width:"70px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width:"100px"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width:"100px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width:"120px"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width:"130px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    // center:true
  },
];

export const fetchDepartments = async()=>{  
    let departments;
    try{
      const response = await axios.get('https://employee-server-one.vercel.app/api/department',{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
         departments = response.data.departments
        //  console.log(departments)
      }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
  } 
  return departments
  }

  // employee for salary form 
  export const getEmployees = async(id)=>{  
    let employees;
    try{
      const response = await axios.get(`https://employee-server-one.vercel.app/api/employee/department/${id}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
         employees = response.data.employees
        //  console.log(departments)
      }
    }catch(error){
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
  } 
  return employees
  }

export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();
  
    return (
      <div className="flex space-x-3">

        <button  className="px-3 py-1 text-white bg-green-600"
          onClick={() => navigate(`/admin-dashboard/employees/${_id}`)} > view </button> 

        <button className="px-3 py-1 text-white bg-blue-600"
            onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)} > Edit </button>
        <button className="px-3 py-1 text-white bg-yellow-600" 
            onClick={()=>navigate(`/admin-dashboard/employees/salary/${_id}`)} > Salary </button>
        <button className="px-3 py-1 text-white bg-red-600"
        onClick={()=>navigate(`/admin-dashboard/employees/leaves/${_id}`)} > Leave </button>
      </div>
    );
  };

