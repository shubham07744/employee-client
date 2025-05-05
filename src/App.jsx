import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/department/DepartmentList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'
import List from './components/employee/List'
import Add from './components/employee/Add'
import View from './components/employee/View'
import Edit from './components/employee/Edit'
import Addsalary from './components/salary/Addsalary'
import Viewsalary from './components/salary/Viewsalary'
import EmpSummaryCard from './components/dashboard/EmpSummaryCard'
import LeaveList from './components/leave/LeaveList'
import AddLeave from './components/leave/AddLeave'
import Setting from './components/setting/Setting'
import LeaveTable from './components/leave/LeaveTable'
import LeaveDetail from './components/leave/LeaveDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={"/admin-dashboard"} />} />
        <Route path='/login' element={ <Login/> } />
        <Route path='/admin-dashboard' element={ 
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={['admin']}>
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<AdminSummary/>} />
            <Route path='/admin-dashboard/departments' element={<DepartmentList/>} />
            <Route path='/admin-dashboard/add-department' element={<AddDepartment/>} />
            <Route path='/admin-dashboard/department/:id' element={<EditDepartment/>} />
            <Route path='/admin-dashboard/employees' element={<List/>} />
            <Route path='/admin-dashboard/add-employee' element={<Add/>} />
            <Route path='/admin-dashboard/employees/:id' element={<View/>} />
            <Route path='/admin-dashboard/employees/edit/:id' element={<Edit/>} />
            <Route path='/admin-dashboard/employees/salary/:id' element={<Viewsalary/>} />
            <Route path='/admin-dashboard/salary/add/' element={<Addsalary/>} />
            <Route path='/admin-dashboard/leaves' element={<LeaveTable/>} />
            <Route path='/admin-dashboard/leaves/:id' element={<LeaveDetail/>} />
            <Route path='/admin-dashboard/employees/leaves/:id' element={<LeaveList/>} />
            <Route path='/admin-dashboard/setting' element={<Setting/>}></Route>
        </Route>

        <Route path='/employee-dashboard' element={ 
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin","employee"]}>
              <EmployeeDashboard/>
            </RoleBasedRoutes>
          </PrivateRoutes>
          } >
          <Route index element={<EmpSummaryCard/>}></Route>
          <Route path='/employee-dashboard/profile/:id' element={<View/>}></Route>
          <Route path='/employee-dashboard/leaves/:id' element={<LeaveList/>}></Route>
          <Route path='/employee-dashboard/add-leave' element={<AddLeave/>}></Route>
          <Route path='/employee-dashboard/salary/:id' element={<Viewsalary/>}></Route>
          <Route path='/employee-dashboard/setting' element={<Setting/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App