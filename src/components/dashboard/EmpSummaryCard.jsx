import React from 'react'
import { FaUser } from 'react-icons/fa'
import { UseAuth } from '../../context/authContext'

const EmpSummaryCard = () => {
    const {user} = UseAuth()
  return (
    <div className='p-5'>
    <div className='rounded flex bg-gray-200'>
        <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
            <FaUser/>
        </div>
        <div className='pl-4 py-1'>
            <p className='text-lg font-semibold'>Welcome Back</p>
            <p className='text-xl font-bold'>{user.name}</p>
        </div>
    </div>
    </div>
  )
}

export default EmpSummaryCard