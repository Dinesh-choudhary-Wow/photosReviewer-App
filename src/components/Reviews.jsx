import React,{useContext, useEffect, useState} from 'react'
import ReactStars from 'react-stars';
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc,doc,updateDoc, where, query, getDocs } from 'firebase/firestore';
import { TailSpin,ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import {AppState} from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id,prevRating,userRated}) => {
    const useAppstate = useContext(AppState);
    const [rating,setRating] = useState(0);
    const [loading,setLoading] = useState(false);
    const [reviewLoading,setReviewLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [newAdded, setNewAdded] = useState(0);

    const sendReview = async() => {
        setLoading(true);
        try{
            if(useAppstate.login){
            await addDoc(reviewsRef,{
                photoid: id,
                name:useAppstate.userName,
                rating:rating,
                thought: form,
                timestamp:new Date().getTime()
            })
            const ref = doc(db,"photos",id);
            await updateDoc(ref,{
                rating:prevRating+rating,
                rated:userRated + 1,
            })
            setRating(0);
            setForm("");
            setNewAdded(newAdded + 1);
            setData([]);
            swal({
                title: "Review Added",
                icon: "success",
                buttons:false,
                timer: 3000,
            });
        }else{
            navigate('/login');
        }
        }catch(error){
            swal({
                title: error.message,
                icon: "error",
                buttons:false,
                timer: 3000,
            });
        }
        setLoading(false);
    }

    useEffect(() => {
        async function getData(){
            setReviewLoading(true);
            let quer = query(reviewsRef, where('photoid', '==', id))
            const querySnapshot = await getDocs(quer);
            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewLoading(false);
        }
        getData();
    },[newAdded]);



  return (
    <div className='mt-5 border-t-2 border-gray-400 w-full'>
        <ReactStars
            size={40}
            half={true}
            value={rating}
            onChange={(rate) => setRating(rate)}
        />
        <input 
            value={form}
            onChange={(e)=>setForm(e.target.value)}
            placeholder='Share Your thoughts...'
            className='w-full p-2 outline-none header bg-black'
        />
        <button onClick={sendReview} className='bg-blue-600 flex justify-center w-full p-2'>
            {loading ? <TailSpin height={20} color="white" /> : 'Share'}
        </button>
        {reviewLoading ? 
            <div className='mt-6 flex justify-center'><ThreeDots height={10} color="white" /></div>
        :
        <div className='mt-4'>
            {data.map((e,i) => {
                return(
                    <div key={i} className='p-2 w-full mt-2 border-b border-gray600'>
                        <div className='flex items-center'>
                            <p className='text-green-500'>{e.name}</p>
                            <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars
                            size={20}
                            half={true}
                            value={e.rating}
                            edit={false}
                        />
                        <p>{e.thought}</p>
                    </div>
                )
            })}
        </div>
        }
    </div>
  )
}

export default Reviews;