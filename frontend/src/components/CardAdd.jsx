import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Plus, Search} from 'lucide-react';

const CardAdd = ({addToCart}) => {
  const [cardData, setCardData] = useState ([]);
  const [searchValue, setSearchValue] = useState ('');

  useEffect (() => {
    axios
      .get ('http://localhost:5000/api/cards')
      .then (response => setCardData (response.data))
      .catch (error => console.log ('Error fetching data:', error));
  }, []);

  // Filter products based on the search input
  const filteredData = cardData.filter (val =>
    val.name.toLowerCase ().includes (searchValue.toLowerCase ())
  );

  return (
    <div className="mt-20 px-4">
      {/* Search Bar */}
      <div className="mb-4 flex items-center bg-white shadow p-2 rounded-md w-full max-w-lg mx-auto">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={e => setSearchValue (e.target.value)}
          className="w-full p-2 border-0 rounded-md focus:outline-none"
        />
      </div>

      {filteredData.length === 0
        ? <p className="text-gray-500 text-center py-8">No products found</p>
        : <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-1 justify-center">
            {filteredData.map (val => (
              <div
                className="shadow-md rounded-lg p-4 bg-white relative"
                key={val._id}
              >
                <div className="imgBox w-full relative">
                  <img
                    src={`http://localhost:5000${val.img}`}
                    alt={val.name}
                    className="w-50 h-40 object-cover rounded-lg"
                  />

                  {/* Floating Add to Cart Button */}
                  <button
                    onClick={() => addToCart (val)}
                    className="absolute top-2 right-2 bg-amber-500 text-white p-2 rounded-full shadow-md hover:bg-amber-600 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="name font-bold text-start px-1">{val.name}</div>
                {/* <div className="name  text-sm text-start px-1">
                  {val.description}
                </div> */}

                <div className="text-xs px-1 font-bold text-amber-500">
                  ({val.Off})
                </div>

                <div className="flex items-center mb-1">
                  <div className="font-bold text-xs">₹{val.price}</div>
                  <div className="text-xs px-1 text-gray-400 line-through">
                    ₹{val.Dprice}
                  </div>
                </div>
              </div>
            ))}
          </div>}
    </div>
  );
};

export default CardAdd;
