import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { photosRef } from "../firebase/firebase";
import swal from 'sweetalert';


const AddMovie = () => {
    const [form, setForm] = useState({
        title: "",
        clickedOn: "",
        description: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);

    const addPhoto = async () => {
        setLoading(true);
        try {
            await addDoc(photosRef, form);
            swal({
                title: "Successfully Added",
                icon: "success",
                buttons:false,
                timer: 3000,
            });
            setForm({
                title:"",
                clickedOn:"",
                description:"",
                image:""
            })
        } catch (err) {
            await addDoc(photosRef, form);
            swal({
                title: err,
                icon: "error",
                buttons:false,
                timer: 3000,
            });
        }
        setLoading(false);
    }
    return (
        <div>
            <section class="text-gray-400 bg-gray-800 body-font relative">
                <div class="container px-5 py-8 mx-auto">
                    <div class="flex flex-col text-center w-full mb-4">
                        <h1 class="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add Photo</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-400">Photo Type</label>
                                    <input type="text" id="title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-gray-400">Clicked on</label>
                                    <input type="text" id="text" name="text" value={form.clickedOn} onChange={(e) => setForm({ ...form, clickedOn: e.target.value })} class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-gray-400">Image Link</label>
                                    <input id="message" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-10 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-gray-400">Description</label>
                                    <textarea id="message" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} name="message" class="w-full bg-blue-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={addPhoto} class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">{loading ? <TailSpin height={25} color="white" /> : 'Upload'}</button>

                            </div>
                            <div class="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
                                <a class="text-green-400" href='https://mail.google.com/'>dineshchoudhary.rdc@gmail.com</a>
                                <p class="leading-normal my-5">Doddathoguru.
                                    <br />Electronic City, Bangalore - 560100
                                </p>
                                <span class="inline-flex">
                                    <a class="text-gray-500" href='https://www.linkedin.com/in/dinesh-choudhary-1607ba193
'>
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-4 text-gray-500" href='https://www.linkedin.com/in/dinesh-choudhary-1607ba193
'>
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-4 text-gray-500" href='https://www.linkedin.com/in/dinesh-choudhary-1607ba193
'>
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-4 text-gray-500" href='https://www.linkedin.com/in/dinesh-choudhary-1607ba193
'>
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddMovie;