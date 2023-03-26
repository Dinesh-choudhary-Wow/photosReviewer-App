import React,{useState} from 'react'
import ReactStars from 'react-stars';
import { reviewsRef, db } from '../firebase/firebase';
import { addDoc,doc,updateDoc } from 'firebase/firestore';
import { TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';

const Reviews = ({id,prevRating,userRated}) => {
    const [rating,setRating] = useState(0);
    const [loading,setLoading] = useState(false);
    const [form, setForm] = useState("");

    const sendReview = async() => {
        setLoading(true);
        try{
            await addDoc(reviewsRef,{
                photoid: id,
                name:"dinesh",
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
            swal({
                title: "Review Added",
                icon: "success",
                buttons:false,
                timer: 3000,
            });
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
    </div>
  )
}

export default Reviews;