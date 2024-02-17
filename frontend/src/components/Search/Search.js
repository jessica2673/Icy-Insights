import React from 'react';
import { TextField } from '@mui/material';
//import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';


const Search = () => (
  <div className='search-container'>
  <InputLabel></InputLabel>
  <TextField id="location" label="Location" variant="filled"/>

  <InputLabel ></InputLabel>
  <TextField id="destination" label="Destination" variant="filled"/>
  </div>
);


export default Search;
