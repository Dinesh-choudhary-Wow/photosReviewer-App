import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mobile:"",
    password:"",

  });
  return (
    <div className='w-full flex flex-col mt-20 items-center'>
      <h1 className='text-5xl font-bold'>SignUP</h1>
      <br />
      <div class="p-2 w-full md:w-1/4">
        <div class="relative">
          <label for="message" type={Number} class="leading-7 text-md text-gray-400">Mobile Number</label>
          <input id="message" value={form.mobile} onChange={(e) => setForm({ ...form, image: e.target.value })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div class="p-2 w-1/4">
        <div class="relative">
          <label for="message" class="leading-7 text-md text-gray-400">Password</label>
          <input id="message" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
        </div>
      </div>

      <div class="p-2 w-full">
        <button class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">{loading ? <TailSpin height={25} color="white" /> : 'Login'}</button>
      </div>
      <div>
        <p>Allready have an account? <Link to={'/login'}><span className='text-violet-600'>Signup</span></Link></p>
      </div>
    </div>
  )
}

export default Signup;