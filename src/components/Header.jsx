import React from 'react'
import AddIcon from '@mui/icons-material/AddTwoTone';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className="sticky z-10 top-0 text-amber-300 flex justify-between items-center p-2 text-2xl bg-slate-900">
        <Link to={'/'}><span>Photos<span className='text-green-500'>Review</span></span></Link>
        <div className='flex items-center'>
        <a href='#home' className='text-lg mr-5 cursor-pointer text-white'> Home</a>
        <a href='#about' className='text-lg mr-5 cursor-pointer text-white'> About</a>
        <a href='#contactus' className='text-lg mr-10 text-white cursor-pointer'> Contact Us</a>
        <Link to={'/addmovie'}><h1 className='text-lg text-blue-300 cursor-pointer flex items-center'>
            <Button><AddIcon className="mr-1" color="info"/><span className='text-gray-500'>Add Photo</span></Button>
        </h1></Link>
        </div>
        
    </div>
  )
}

export default Header;