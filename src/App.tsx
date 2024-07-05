import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './redux/themeSlice';
import { RootState } from './redux/store';
import { Moon, Sun } from "lucide-react"
import { useTheme } from './utils/utils';
import { useEffect, useState } from 'react';
import data from "./assets/output.json";
import { useDebounce } from 'use-debounce';

interface Result {
  item_id: string;
  city: string;
  quality: number;
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
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.darkmode);

  const [selectedServer, setSelectedServer] = useState<string>(server.east);
  const [search, setSearch] = useState<string>("");
  const [searchDebounced] = useDebounce(search, 500);
  const [results, setResults] = useState<{ city: string, stats: Result[] }[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);

  const searchItem = data.items.filter((item: { Id: string; itemId: string; itemsName: string; }) =>
    item.itemsName.toLowerCase().includes(searchDebounced.toLowerCase())
  )
  
  const itemName = searchItem[0]?.itemsName
  const itemId = searchItem[0]?.itemId

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

    if (itemId.trim() !== "") {
      fetchStats(itemId)
    } else {
      setResults([])
    }
  }, [itemId, selectedServer])

  return (
    <>
      <div className='bg-theme-base00  font-poppins'>
        {/* header */}
        <div className='p-5 flex justify-between border-b-2 border-theme-base07  max-w-7xl mx-auto '>
          <p className='text-theme-base06'>Welcome to Albion market</p>
          {isDarkMode ? <Sun color={theme.base06} onClick={() => dispatch(toggleTheme())} /> : <Moon color={theme.base06} onClick={() => dispatch(toggleTheme())} />}
        </div>

        {/* search bar */}
        <div className='flex flex-row p-5 max-w-7xl mx-auto justify-evenly'>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for item' className='w-2/3 p-2 rounded-md bg-theme-base01 placeholder:text-theme-base05 text-theme-base07 outline-none' />


          <select className='rounded-md pl-2 bg-theme-base01 text-theme-base05 outline-none' value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)}>{Object.keys(server).map((key) => <option key={key} value={key}>{key.toUpperCase()}</option>)}</select>
        </div>

        {/* results */}
        <div className='max-w-7xl mx-auto'>
          <div className='p-5 flex items-center justify-center'>
            <img src={`https://render.albiononline.com/v1/item/${itemId}.png`} alt={itemName} className='w-24' />
            <p className='text-theme-base06 lg:text-3xl text-xl'>{itemName}</p>
          </div>
          {isloading ? <p>Loading...</p> : results.map((result) => {
            return (
              <div key={result.city} className='p-5'>
                <p className='text-theme-base06'>{result.city}</p>
                <div className='grid grid-cols-4 gap-4'>
                  {result.stats.map((stat) => {
                    return (
                      <div key={stat.item_id} className='p-5 rounded-md bg-theme-base01'>
                        <p className='text-theme-base06'>minimum sell price: {stat.sell_price_min}</p>
                        <p className='text-theme-base06'>minimum buy price: {stat.buy_price_min}</p>
                        <p className='text-theme-base06'>quality : {stat.quality}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default App;