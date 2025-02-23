import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Plus} from 'lucide-react';

const CardAdd = ({addToCart, searchValue}) => {
  const [cardData, setCardData] = useState ([]);

  useEffect (() => {
    axios
      .get ('https://your-app.onrender.com/api/cards')
      .then (response => setCardData (response.data))
      .catch (error => console.log ('Error fetching data:', error));
  }, []);

  const filteredData = cardData.filter (
    val =>
      searchValue === '' ||
      val.name.toLowerCase ().includes (searchValue.toLowerCase ())
  );

  return (
    <div className="flex flex-wrap justify-center mt-20">
      {filteredData.length === 0
        ? <p className="text-gray-500 text-center py-8">No products found</p>
        : filteredData.map (val => (
            <div
              className="box m-3 shadow-md rounded-lg w-full sm:w-64 lg:w-72 xl:w-80 p-4 bg-white"
              key={val._id}
            >
              <div className="imgBox w-full">
                <img
                  src={`http://localhost:5000${val.img}`} // FIX: Remove extra "/"
                  alt={val.name}
                  className="w-full h-60 object-cover rounded-t-lg"
                  //   onError={e =>
                  //     (e.target.src = 'https://via.placeholder.com/150')} // Placeholder if image fails
                  //
                />

              </div>
              <div className="name font-bold text-start px-1">{val.name}</div>
              <div className="flex items-center mb-1">
                <div className="font-bold text-xs px-1">₹{val.price}</div>
                <div className="text-xs px-1 text-gray-400 line-through">
                  ₹{val.Dprice}
                </div>
                <div className="text-xs px-1 font-bold text-rose-600">
                  ({val.Off})
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => addToCart (val)}
                  className="shadow text-xs p-1 text-white bg-amber-500 rounded hover:bg-amber-600 transition-all flex items-center px-3"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default CardAdd;
