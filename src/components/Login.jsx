import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { query, where, getDocs } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs';
import { AppState } from '../App';
import swal from 'sweetalert';


const Login = () => {
  const useAppstate = useContext(AppState);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile));
      const querySnapshot = await getDocs(quer);
      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          navigate('/');
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  }


  return (
    <div className='w-full flex flex-col mt-20 items-center'>
      <h1 className='text-5xl font-bold'>Login</h1>
      <br />
      <div class="p-2 w-full md:w-1/4">
        <div class="relative">
          <label for="message" class="leading-7 text-md text-gray-400">Enter your Mobile Number</label>
          <input id="message" type={'number'} value={form.mobile} onChange={(e) => setForm({
            ...form, mobile:
              e.target.value
          })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div class="p-2 w-1/4">
        <div class="relative">
          <label for="message" class="leading-7 text-md text-gray-400">Password</label>
          <input id="message" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
        </div>
      </div>

      <div class="p-2 w-full">
        <button onClick={login} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">{loading ? <TailSpin height={25} color="white" /> : 'Login'}</button>
      </div>
      <div>
        <p>Do Not have an account? <Link to={'/signup'}><span className='text-violet-600'>Sign Up</span></Link></p>
      </div>
    </div>
  )
}

export default Login;