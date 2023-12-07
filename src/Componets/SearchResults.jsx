import React from "react";

const SearchResults = ({ results }) => {

  // Function to handle result click
  const handleResultClick = (id) => {
    // Open a new window and search the game on Steam
    window.open(`https://store.steampowered.com/search/?term=${id}`, "_blank");

  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-7">
      {results.map((item) => (
        <div
          className="pb-14 bg-slate-300 dark:bg-gray-700 p-4 rounded-lg h-full hover:scale-110 transition-all duration-300 cursor-pointer"
          onClick={() => handleResultClick(item.name)}
          key={item.id}
        >
          <img
            src={item.background_image}
            width={1080}
            className="w-full h-[80%] rounded-xl object-cover"
            alt={item.name}
          />
          <div>
            <h2 className="text-[20px] dark:text-white font-bold">{item.name}</h2>
            <span className="p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium">
              {item.metacritic}
            </span>
            <h2 className="text-gray-500">⭐{item.rating} 💬{item.reviews_count} 🔥{item.suggestions_count}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
