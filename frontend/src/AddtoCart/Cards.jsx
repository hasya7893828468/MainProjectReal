import React, {useState} from 'react';
import CardData from '../Card/Card.js'; // Assuming this is where your data is stored
import '../Card/card.css';

const Cards = ({addToCart}) => {
  const [value, setValue] = useState ('');

  const CardDataOutput = CardData.filter (val => {
    if (value === '') {
      return val;
    } else if (
      val.name.toLocaleLowerCase ().includes (value.toLocaleLowerCase ())
    ) {
      return val;
    }
  }).map (val => {
    return (
      <div
        className="box m-3 shadow-md  rounded-lg w-full sm:w-64 lg:w-72 xl:w-80 "
        key={val.id}
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
              <i className="fa-solid fa-star text-amber-300" /> | {val.likes}
            </div>
          </div>
        </div>

        <div className="name font-bold text-start px-1">{val.name}</div>
        <div className="description text-start px-1 ">{val.description}</div>

        <div className="flex items-center mb-1">
          <div className="font-bold text-xs px-1">RS.{val.price}</div>
          <div className="text-xs px-1 text-gray-400 line-through">
            Rs.{val.Dprice}
          </div>
          <div className="text-xs px-1 font-bold text-rose-600">
            ({val.Off})
          </div>

        </div>
        <div className=" flex  justify-center m-1 ">
          <button
            className="shadow text-xs p-1 text-amber-500 rounded hover:bg-amber-100 transition-all"
            onClick={() => addToCart (val)} // Call addToCart with the product object
          >
            Shop now
          </button>
        </div>

        {/* <div className="relative">
          
        </div> */}
      </div>
    );
  });

  return (
    <pm>
      <div className="col-6 mb-2  w-40 text-current shadow rounded ">
        <input
          type="search"
          placeholder="Search the products"
          className="p-2 w-full rounded-lg"
          onChange={e => setValue (e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {CardDataOutput}
      </div>
    </pm>
  );
};

export default Cards;
