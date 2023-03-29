import React, { useEffect, useState } from 'react'
import { CirclesWithBar } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore';
import { photosRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(photosRef);
      _data.forEach((doc) => {
        setData((prev) => [...prev, {...doc.data(),id:doc.id}])
      });
      setLoading(false);
    }
    getData();
  }, []);
  
  return (
    <div className="flex flex-wrap justify-between p-3 mt-2">
      {loading ? <div className='w-full flex justify-center items-center min-h-screen'><CirclesWithBar
        height="60"
        width="60"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
      /></div> :
        data.map((e, i) => {
          return (
            <Link to={`/detail/${e.id}`}><div key={i} className='mt-6 bg-gray-900 p-2 font-medium shadow-xl hover:-translate-y-3 cursor-pointer transition-all duration-300'>
              <img className='photo h-60 md:h-72' src={e.image} />
              <h1>
                {e.title}
              </h1>
              {/* <h1>
                <span className='text-indigo-500'>Description: </span> {e.description}
              </h1> */}
              <h1 className='flex items-center '>
                <span className='text-indigo-500 mr-1'>Rating: </span>
                <ReactStars
                  size={20}
                  half={true}
                  value={e.rating/e.rated}
                  edit={false}
                />
              </h1>
              <h1>
                <span className='text-indigo-500'>ClickedOn: </span>{e.clickedOn}
              </h1>
            </div></Link>
          );
        })
      }
    </div>
  );
};

export default Cards;