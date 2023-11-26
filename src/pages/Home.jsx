import React, { useState, useEffect } from "react";
import data from "../assets/output.json";
import moment from "moment";
import TopApp from "../components/header";

function Home() {
  const serverOptions = {
    West: "west",
    East: "east",
  };

  const [selectedServer, setSelectedServer] = useState(serverOptions["West"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [stats, setStats] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    const fetchStats = async (itemId) => {
      try {
        const locations = [
          "Caerleon",
          "Bridgewatch",
          "Thetford",
          "FortSterling",
          "Martlock",
          "Lymhurst",
        ];

        const response = await fetch(
          `https://${selectedServer}.albion-online-data.com/api/v2/stats/prices/${itemId}?locations=${locations.join(",")}&qualities=0,1,2,3,4,5&time-scale=6`
        );
        const data = await response.json();

        const uniqueCities = [...new Set(data.map((stat) => stat.city))];
        const updatedStats = uniqueCities.map((city) => {
          const cityStats = data.find((stat) => stat.city === city);
          return {
            city: city,
            stats: cityStats || {
              sell_price_min: 0,
              sell_price_min_date: null,
              sell_price_max: 0,
              sell_price_max_date: null,
            },
          };
        });

        setStats(updatedStats);
      } catch (error) {
        console.error(error);
        setStats([]);
      }
    };

    const searchItems = () => {
      if (searchQuery !== "") {
        try {
          const results = data.items.filter((item) =>
            item.itemsName.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (results.length > 0) {
            const itemId = results[0].itemId;
            setSearchResult({ itemId, itemsName: results[0].itemsName });
            fetchStats(itemId);
            setNoDataFound(false); // Reset noDataFound flag
          } else {
            setSearchResult(null);
            setStats([]);
            setNoDataFound(true);
          }
        } catch (error) {
          console.error(error);
          setSearchResult(null);
          setStats([]);
          setNoDataFound(true);
        }
      } else {
        setSearchResult(null);
        setStats([]);
        setNoDataFound(false);
      }
    };

    searchItems();
  }, [searchQuery, selectedServer]);

  return (
    <div className="font-mono">
      {/*<TopApp />*/}

      <div className="flex flex-col p-5">
        <div className="flex items-center justify-center space-x-6 mt-10">
          <div className="text-2xl md:text-5xl">Albion Market</div>
          <input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 h-10 rounded-full border border-black font-mono text-center"
          />
          <select
            className="rounded-md bg-white p-2 m-5 font-mono text-xl"
            value={selectedServer}
            onChange={(e) => setSelectedServer(e.target.value)}
          >
            {Object.entries(serverOptions).map(([key, value]) => (
              <option value={value} key={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {searchResult && stats.length > 0 ? (
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <img
                src={`https://render.albiononline.com/v1/item/${searchResult.itemId}.png`}
                alt={searchResult.itemsName}
                width={65}
                height={60}
              />
              <div className="text-l ml-3">{searchResult.itemsName}</div>
            </div>

            {stats.some((stat) => stat.stats.sell_price_min !== 0) ? (
              stats.map((stat, index) => {
                if (stat.stats.sell_price_min !== 0) {
                  return (
                    <div key={index} className="font-mono">
                      <h2 className="text-xl underline mt-5 text-center mb-2">{stat.city}</h2>
                      <p className="text-s">Minimum Sell Price: {stat.stats.sell_price_min}</p>
                      <p className="text-s">
                        Min Sell Price Last Updated:{" "}
                        {moment(stat.stats.sell_price_min_date).format("MMMM Do YYYY, h:mm:ss a")}
                      </p>
                      <p className="text-s">Maximum Sell Price: {stat.stats.sell_price_max}</p>
                      <p className="text-s">
                        Max Sell Price Last Updated:{" "}
                        {moment(stat.stats.sell_price_max_date).format("MMMM Do YYYY, h:mm:ss a")}
                      </p>
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <p className="font-mono mt-5">No data found.</p>
            )}
          </div>
        ) : (
          <div className="font-mono mt-5">
            {noDataFound ? (
              <p>No data found for the search query.</p>
            ) : (
              <p>
                Search for the item you want based on tier and enchantments.
                <br />
                <p className="pt-5 pl-0 pr-0 ml-0 mr-0">
                  For example: <br />
                  Adept's dual swords, Adept's dual swords@1 <br />
                  @1,2,3,4 are the enchantments. Items should be searched by their full name.
                </p>
                <p className="pt-24">
                  Note: Content is fetched every hour. If the item price is '0', then it's not
                  updated at the server.
                </p>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
