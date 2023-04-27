import React, { useState } from 'react';
import data from './assets/output.json';
import moment from 'moment';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [stats, setStats] = useState(null);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query !== '') {
      try {
        const results = data.items.filter((item) => {
          return item.itemsName.toLowerCase().includes(query.toLowerCase());
        });

        if (results.length > 0) {
          // Get the itemId of the first matching item
          const itemId = results[0].itemId;

          // Update the searchResult state with the itemId and itemsName of the matching item
          setSearchResult({ itemId, itemsName: results[0].itemsName });

          // Fetch the stats for the matching item
          fetch(`https://www.albion-online-data.com/api/v2/stats/prices/${itemId}?locations=Caerleon,Bridgewatch,Thetford,FortSterling,Martlock,Lymhurst&qualities=0,1,2,3,4,5`)
            .then(response => response.json())
            .then(data => {
              const uniqueCities = [...new Set(data.map(stat => stat.city))];
              setStats(uniqueCities.map(city => {
                return {
                  city: city,
                  stats: data.filter(stat => stat.city === city)[0]
                };
              }));
            })
            .catch(error => {
              console.error(error);
              setStats([]);
            });
        } else {
          setSearchResult(null);
          setStats([]);
        }
      } catch (error) {
        console.error(error);
        setSearchResult(null);
        setStats([]);
      }
    } else {
      setSearchResult(null);
      setStats(null);
    }
  };
  return (
    <div class="font-mono text-center">
	    
	  <div class="flex flex-col justify-center items-center p-5">
	      <div class="text-3xl md:text-base mt-10">Albion Market</div>
	      <input
	        type="text"
	        placeholder="search"
	        value={searchQuery}
	        onChange={handleSearch}
	        class="w-full md:w-60 h-10 mt-5 mb-3 px-3 rounded-full border border-black font-mono"
	      />
	      {searchResult && stats && stats.length > 0 ? (
		            <div class="flex flex-col items-center">
		              <div class="flex items-center">
		                <img
		                  src={`https://render.albiononline.com/v1/item/${searchResult.itemId}.png`}
		                  alt={searchResult.itemsName}
		                  width={65}
		                  height={60}
		                />
		                <div class="text-xl ml-3">{searchResult.itemsName}</div>
		              </div>

		              {stats.map((stat, index) => (
				                <div key={index} class="text-center font-mono">
				                  <h2 class="text-xl underline mt-5">{stat.city}</h2>
				                  <p>Minimum Sell Price: {stat.stats.sell_price_min}</p>
				                  <p>Min Sell Price Last Updated: {moment(stat.stats.sell_price_min_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
				                  <p>Maximum Sell Price: {stat.stats.sell_price_max}</p>
				                  <p>Max Sell Price Last Updated: {moment(stat.stats.sell_price_max_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
				                </div>
				              ))}
		            </div>
		          ) : (
				        <p class="font-mono mt-5">No data found.</p>
				      )}

	      <div class="fixed text-xs bottom-0 left-0 w-full bg-yellow-300 text-center p-2">
	        <p>Content is taken from Albion Data Project, updated every few hours.</p>
	      </div>
	    </div>
	  </div>

  );
}

export default App
