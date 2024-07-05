import { useState } from 'react';
import axios from 'axios';
import './App.css'



const CIVIC_API_KEY = import.meta.env.VITE_APP_CIVIC_API_KEY


function App() {

  const [repData, setRepData] = useState(null); 
  const [error, setError] = useState(null); 
  



  const getData = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/civicinfo/v2/representatives', {
        params: {
          key: CIVIC_API_KEY,
          address: "11491 cypress point ct reston, va 20190"
        }
      });

      const officials = response.data.officials.map((official) => ({
        name: official.name,
        party: official.party
      }))

      const offices = response.data.offices.map((office) => ({
        name: office.name
      }))

      setRepData(officials, offices)
      console.log(officials)
      console.log(response.data.officials)
      console.log(response.data.offices)
      
      

    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      console.error('Error fetching representatives:', err.response ? err.response.data : err.message)
    }
  }; 


  return (
    <>
     <section>
          <button onClick={getData}>Roles in Government</button>
      {repData && (
        <section>
          <ul>
          {repData.map((official, id) => (
            <li key = {id}>
                Name: {official.name}
                Party: {official.party}
            </li>
            ))}
          </ul>
          <pre>{JSON.stringify(repData, null, 2)}</pre>
        </section>
      )}
      </section>
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
