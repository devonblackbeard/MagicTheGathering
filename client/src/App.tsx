import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { debounce } from 'lodash';


function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchSearchResults = async () => {
    try {
        //console.log("Sending ", searchQuery);        
        const response = await fetch(`http://localhost:3001/api/search?term=${searchQuery}`); //const response = await fetch(`${baseUrl}/api/search`);
        const data = await response.json();
        console.log('Server response:', data);        
    } catch (error) {
        console.error('Error sending GET request:', error);        
    }
};

  // Debounce the API request function with time of 1 second
  const debouncedFetch = debounce(async () => {
    await fetchSearchResults();
  }, 1000);

  useEffect(() => {
    if (searchQuery) {
      debouncedFetch();
    }
  }, [searchQuery, debouncedFetch]);


  const updateSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {   
    setSearchQuery(event.target.value);
  };


  return (
    <>
      <div>      
        <div>Enter Card:</div>
        <input
          type="text"
          placeholder="Search card name"
          value={searchQuery}
          onChange={updateSearchTerm}
        />
      </div>
      

    </>
  )
}

export default App
