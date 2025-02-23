import { Data } from './CardData';
import './Showcard.css';

const ShowCard = () => {
  const CardData = Data;

  const Card = CardData.map((item) => {
      return (
        <>
      <div className="box m-2 shadow border rounded-lg w-full sm:w-80 md:w-96 lg:w-1/4 xl:w-1/5">
        <div className="p-2">
          <img
            className="h-72 w-full object-cover rounded-t-lg"
            src={item.img}
            alt={item.Name}
          />
        </div>
        <div className="text-center mt-4">
          <p className="text-md font-medium">{item.Name}</p>
          <p className="text-xl font-bold text-gray-800">{item.Offer}</p>
          <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            {item.button}
          </button>
        </div>
              </div>
              </>
    );
  });

  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center p-4">
      {Card}
    </div>
  );
};

export default ShowCard;
