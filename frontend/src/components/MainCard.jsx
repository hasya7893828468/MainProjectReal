import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Cards = () => {
  const [value, setValue] = useState ('');
  const [cardData, setCardData] = useState ([]);

  useEffect (() => {
    axios
      .get ('http://localhost:5000/api/cards')
      .then (response => setCardData (response.data))
      .catch (error => console.log ('Error fetching data:', error));
  }, []);

  const filteredData = cardData.filter (
    val =>
      value === '' || val.name.toLowerCase ().includes (value.toLowerCase ())
  );

  return (
    <div>
      <div className="flex justify-center  
      ">
        <div className="col-6 mb-2  w-80 text-current bg white shadow rounded  mt-17  ">
          <input
            type="search"
            placeholder="Search the products"
            className="p-2 w-full rounded-lg "
            onChange={e => setValue (e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredData.map (val => (
          <div
            className="box m-3 shadow-md rounded-lg w-full sm:w-64 lg:w-72 xl:w-80"
            key={val._id}
          >
            <div className="imgBox w-full">
              <img
                src={val.img}
                alt={val.name}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="relative text-xs">
                <div className="bg-white absolute bottom-0 left-0 p-1 m-1 text-xs font-bold rounded">
                  {val.rating}
                  <i className="fa-solid fa-star text-amber-300" />
                  {' '}
                  |
                  {' '}
                  {val.likes}
                </div>
              </div>
            </div>
            <div className="name font-bold text-start px-1">{val.name}</div>
            <div className="description text-start px-1">{val.description}</div>
            <div className="flex items-center mb-1">
              <div className="font-bold text-xs px-1">RS.{val.price}</div>
              <div className="text-xs px-1 text-gray-400 line-through">
                Rs.{val.Dprice}
              </div>
              <div className="text-xs px-1 font-bold text-rose-600">
                ({val.Off})
              </div>
            </div>
            <div className="flex justify-center m-1">
              <button className="shadow text-xs p-1 text-amber-500 rounded hover:bg-amber-100 transition-all">
                Shop now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
