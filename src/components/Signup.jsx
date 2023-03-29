import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {getAuth, RecaptchaVerifier,signInWithPhoneNumber} from 'firebase/auth'
import app from '../firebase/firebase'
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';


const auth = getAuth(app);

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    mobile: "",
    password: "",
    name: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size' : 'invisible',
      'callback' : (response) => {

      }
    },auth);
  }

  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth,`+91${form.mobile}`, appVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      swal({
        text: "OTP Sent",
        icon: "success",
        buttons:false,
        timer:3000,
      });
      setOtpSent(true);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }

  const verifyOTP = () => {
    try{
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text:"Successfully Registered",
          icon: "success",
          buttons : false,
          timer:3000,
        });
        navigate('/login')
        setLoading(false);
      })
    }catch(error){
      console.log(error);
    }
  }


  const uploadData = async () => {
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(form.password, salt);
    await addDoc(usersRef, {
      name:form.name,
      password: hash,
      mobile: form.mobile,
    })
  }

  return (
    <div className='w-full flex flex-col mt-20 items-center'>
      <h1 className='text-3xl font-bold'>SignUP</h1>
      <br />
      {otpSent ?
        <>
          <div class="p-2 w-full md:w-1/4">
            <div class="relative">
              <label for="message" class="leading-7 text-md text-gray-400">Enter One Time Password (OTP)</label>
              <input id="message" value={OTP} onChange={(e) => setOTP(e.target.value)} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div class="p-2 w-full">
            <button onClick={verifyOTP} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">{loading ? <TailSpin height={25} color="white" /> : 'Confirm OTP'}</button>
          </div>
        </>
        :
        <>
          
          <br />
          <div class="p-2 w-1/4">
            <div class="relative">
              <label for="message" class="leading-7 text-md text-gray-400">Name</label>
              <input id="message" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div class="p-2 w-full md:w-1/4">
            <div class="relative">
              <label for="message" type={Number} class="leading-7 text-md text-gray-400">Mobile Number</label>
              <input id="message" value={form.mobile} onChange={(e) => setForm({
                ...form, mobile:
                  e.target.value
              })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div class="p-2 w-1/4">
            <div class="relative">
              <label for="message" class="leading-7 text-md text-gray-400">Password</label>
              <input id="message" type='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
            </div>
          </div>

          <div class="p-2 w-full">
            <button onClick={requestOtp} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">{loading ? <TailSpin height={25} color="white" /> : 'Request OTP'}</button>
          </div>
        </>
      }
      <div>
        <p>Allready have an account? <Link to={'/login'}><span className='text-violet-600'>Login</span></Link></p>
      </div>
      <div id='recaptcha-container'></div>
    </div>
  )
}

export default Signup;