import { useState } from 'react';
import axios from 'axios';
import './App.css'


const CIVIC_API_KEY = import.meta.env.VITE_APP_CIVIC_API_KEY
console.log('CIVIC_API_KEY:', CIVIC_API_KEY);

function App() {

  const [repData, setRepData] = useState(null); 
  const [error, setError] = useState(null); 


  const getRep = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/civicinfo/v2/representatives', {
        params: {
          key: CIVIC_API_KEY,
          address: "11491 cypress point ct reston, va 20190"
        }
      });

      setRepData(response.data)
      console.log(response.data)
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      console.error('Error fetching representatives:', err.response ? err.response.data : err.message)
    }
  }; 


  return (
    <>
     <section>
          <button onClick={getRep}>Who is my Rep?</button>
      </section>
      {repData && (
        <section>
          <h2>Representative Information</h2>
          <pre>{JSON.stringify(repData, null, 2)}</pre>
        </section>
      )}
      {error && (
        <section>
          <h2>Error</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </section>
      )}
      

    </>
  )
}

export default App
