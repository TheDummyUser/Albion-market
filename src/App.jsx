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
    <div className=''>
      <div className='md:flex md:place-content-center md:space-x-6 p-5'>
        <div className='md:text-base text-4xl md:mt-5 mt-10'>Albion Market</div>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearch}
          className='p-5 rounded-full md:mt-0 mt-10 border border-black w-full h-10 md:w-60'
        />
      </div>
  
      {searchResult && stats && stats.length > 0 && (
        <div>
        <div className=''>
        <div className='m-5 text-xl'>{searchResult.itemsName}</div>
        <img className='flex place-centent-center'
            src={`https://render.albiononline.com/v1/item/${searchResult.itemId}.png`}
            alt={searchResult.itemsName}
          />
        </div>
          
  
          {stats.map((stat, index) => {
            return (
              <div key={index} className='mb-10'>
                <h2 className='text-xl underline mb-3 mt-3'>{stat.city}</h2>
                <p>Minimum Sell Price: {stat.stats.sell_price_min}</p>
                <p>Min Sell Price Last Updated: {moment(stat.stats.sell_price_min_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p>Maximum Sell Price: {stat.stats.sell_price_max}</p>
                <p>Max Sell Price Last Updated: {moment(stat.stats.sell_price_max_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
              </div>
            );
          })}
        </div>
      )}
  
      {(!searchResult || !stats || stats.length === 0) && (
        <p>No results found.</p>
      )}
    <div className='fixed left-0 bottom-0 w-full bg-yellow-300 text-center'><p>content is taken from albion data project, updated every few hours</p></div>
    </div>
  );
}

export default App
