import React, {useState} from 'react';
import { TextField } from '@mui/material';
//import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import axios from 'axios'

const Search = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');

  const sendData = async (formData) => {
    formData.forEach((value, key) => { console.log(`${key}: ${value}`); });
    try {
      const response = await axios({
        method: "POST",
        url: "/snow/paths",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (await !response.ok) {
        console.log(response.error);
      }

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("start", startLocation);
    formData.append("end", destination);
    
    await sendData(formData);
  }
  
  return (
    <div className='search-container'>
      <form encType="multipart/form-data" action="/snow/paths" method="POST" onSubmit={handleSubmit}>
        <InputLabel></InputLabel>
        <TextField id="location" label="Location" variant="filled" onChange={(e) => setStartLocation(e.target.value)}/>

        <InputLabel></InputLabel>
        <TextField id="destination" label="Destination" variant="filled" onChange={(e) => setDestination(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default Search;
