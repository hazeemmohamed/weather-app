import React, { useEffect, useState } from 'react'
import './App.css'
import { FaSearch, FaCloud } from 'react-icons/fa'
import axios from 'axios'


function App() {


  const apiKey = "1cd3368042d34445b6ae925714ef2011"

  const [weather,setWeather]=useState(null)
  const [search, setSearch] = useState("")
  const [temp,setTemp] = useState("")
  const [description, setDescription]=useState("")
  const [humidity, setHumidity] = useState("")
  const [lat, setLat] = useState("")
  const [long, setLong] = useState("")
  const [error, setError] = useState("")

  

  const handleSearch = (e)=>{
    setSearch(e.target.value)
  }

   useEffect(() => {
    if (search.trim() === "") {
      setTemp("");
      setDescription("");
      setError("");
    }
  }, [search]); 
 
    const handleClicked = () => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`)
      .then(res => {
        const data = res.data
        setTemp(data.main.temp)
        console.log(data.weather[0].description);
        setDescription(data.weather[0].description)
        setLat(data.coord.lat)
        setLong(data.coord.lon)
        setHumidity(data.main.humidity)

        

        console.log(data)
      })
          .catch(err => 
            setError("❌ Invalid country name. Please try again."),
            setTemp(""),
            setDescription("")
          );

  }
  

  return (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-200 to-blue-500 p-4">

  <div className="flex flex-col items-center p-6 w-full max-w-md rounded-2xl shadow-2xl bg-white/40 backdrop-blur-lg border border-white/20">

    <h1 className="text-2xl font-bold mb-4 text-gray-700">Weather App</h1>

    <div className="flex w-full items-center gap-3 mb-6">
      
      <input
        type="text"
        placeholder="Search city..."
        className="w-full p-3 rounded-xl border border-gray-300 shadow-inner outline-none focus:ring-2 focus:ring-blue-400 transition bg-white/70"
        onChange={handleSearch}
      />

      <button className="p-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg transition"
      onClick={handleClicked}
      >
        <FaSearch  />
      </button>
    </div>
    {error && <p className="text-red-600 mt-4">{error}</p>}

    <FaCloud className="text-8xl text-blue-600 mb-4" />

    <h2 className="text-5xl font-semibold text-gray-800">
      {temp}
    </h2>

    <p className="text-lg text-gray-600 mt-4">{description}</p>

  
  <div className="flex justify-between items-center w-full text-gray-600" >
    <p>Lat: <span className='text-black'>{lat}</span>, Long<span className='text-black'>{long}</span></p>
    <p>Humidity: <span className='text-black'>{humidity}</span></p>

  </div>
  </div>

</div>

  )
}

export default App
