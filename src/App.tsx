import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './redux/themeSlice';
import { RootState } from './redux/store';
import { Moon, SearchIcon, Sun } from "lucide-react"
import { useEffect, useState } from 'react';
import data from "./assets/output.json";
import { useDebounce } from 'use-debounce';

type quality = 0 | 1 | 2 | 3 | 4 | 5

interface Result {
  item_id: string;
  city: string;
  quality: quality;
  sell_price_min: number;
  sell_price_min_date: Date;
  sell_price_max: number;
  sell_price_max_date: Date;
  buy_price_min: number;
  buy_price_min_date: Date;
  buy_price_max: number;
  buy_price_max_date: Date;
}

const server = {
  east: 'east',
  europe: 'europe',
  west: 'west',
}

const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.darkmode);

  const [selectedServer, setSelectedServer] = useState<string>(server.east);
  const [search, setSearch] = useState<string>("");
  const [searchDebounced] = useDebounce<string>(search, 500);
  const [results, setResults] = useState<{ city: string, stats: Result[] }[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);

  const searchItem = data.items.filter((item: { Id: string; itemId: string; itemsName: string; }) =>
    item.itemsName.toLowerCase().includes(searchDebounced?.toLowerCase())
  )

  const itemName = searchDebounced.trim().length >= 0 ? searchItem[0]?.itemsName : ""
  const itemId = searchDebounced.trim().length >= 0 ? searchItem[0]?.itemId : ""

  useEffect(() => {
    const fetchStats = async (itemId: string) => {
      setIsloading(true)
      try {
        const locations = ["Caerleon",
          "Bridgewatch",
          "Thetford",
          "FortSterling",
          "Martlock",
          "Lymhurst",];

        const response = await fetch(`https://${selectedServer}.albion-online-data.com/api/v2/stats/prices/${itemId}.json?locations=${locations.join(",")}`);
        const data = await response.json();
        const uniquecitys = [...new Set(data.map((item: Result) => item.city))];
        const updatedStats = uniquecitys.map((value: unknown) => {
          const city = value as string;
          const cityData = data.filter((item: Result) => item.city === city)
          return {
            city,
            stats: cityData as Result[]
          }
        })
        setResults(updatedStats)
        setIsloading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStats(itemId)
  }, [itemId, selectedServer])

  const Loading = () => (
    <div className='flex justify-center items-center h-screen bg-theme-base00'>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-base06"></div>
    </div>
  );

  return (
    <div className='bg-theme-base00 font-poppins min-h-screen text-theme-base06'>
      {/* Header */}
      <header className='p-5 flex justify-between items-center border-b border-theme-base07 max-w-7xl mx-auto'>
        <h1 className='text-xl font-semibold'>Welcome to Albion Market</h1>
        <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-full hover:bg-theme-base01 transition-colors">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      {/* Search bar */}
      <div className='flex flex-col sm:flex-row p-5 max-w-7xl mx-auto space-y-4 sm:space-y-0 sm:space-x-4'>
        <div className='flex-grow relative'>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for item'
            className='w-full p-3 bg-theme-base01 placeholder:text-theme-base05 text-theme-base07 outline-none rounded-md pr-10'
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-theme-base05" size={20} />
        </div>
        <select
          className='p-3 rounded-md bg-theme-base01 text-theme-base05 outline-none cursor-pointer'
          value={selectedServer}
          onChange={(e) => setSelectedServer(e.target.value)}
        >
          {Object.keys(server).map((key) => (
            <option key={key} value={key}>{key.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Results */}
      <main className='max-w-7xl mx-auto p-5'>
        {itemName && (
          <div className='flex items-center justify-center mb-8'>
            <img src={`https://render.albiononline.com/v1/item/${itemId}.png`} alt={itemName} className='w-16 h-16 mr-4' />
            <h2 className='text-2xl sm:text-3xl font-bold'>{itemName}</h2>
          </div>
        )}

        {isloading ? <Loading /> : (
          <div className='space-y-8'>
            {results.map((result) => (
              <div key={result.city} className='bg-theme-base01 rounded-lg p-6'>
                <h3 className='text-xl font-semibold mb-4'>{result.city}</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                  {result.stats.map((stat) => (
                    <div key={stat.item_id} className='p-4 rounded-md bg-theme-base00 shadow-md'>
                      <p>Min Sell Price: <span className='font-semibold'>{stat.sell_price_min}</span></p>
                      <p>Min Buy Price: <span className='font-semibold'>{stat.buy_price_min}</span></p>
                      <p>Quality: <span className='font-semibold'>{stat.quality}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;