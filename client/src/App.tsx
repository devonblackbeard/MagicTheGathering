import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { Card, Response } from './model/models';


function App() {
  //TODO : documentation, host on netlify, image not found, sorting, pagination, Maximum length: 1000 Unicode characters., max req 1 per second, env file, cleanup logs

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cardList, setCardList] = useState<Card[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchSearchResults = async () => {
    try {      
      const response = await fetch(`http://localhost:3001/api/search?term=${searchQuery}`);
      const responseObj = await response.json() as Response;

      if (responseObj.error) {
        setIsError(true)
      }
      else {
        setCardList(responseObj.data)
        setIsError(false)
      }

    } catch (error) {
      console.error('Error sending GET request:', error);
      setIsError(true)
    }
  };

  // Debounce the API request function with time of 1 second
  // const debouncedFetch = debounce(async () => {
  //   await fetchSearchResults();
  // }, 1000);

  // useEffect(() => {
  //   if (searchQuery) {
  //     debouncedFetch();
  //   }
  // }, [searchQuery, debouncedFetch]);


  // const updateSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {   
  //   setSearchQuery(event.target.value);
  // };


  // Debounce the API request function with a delay of 1000 milliseconds
  //   const debouncedFetch = debounce(async () => {
  //   await fetchSearchResults();
  // }, 1000);

  // Update the search term and trigger the debounce function
  const updateSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  // After the user stops typing for one second call the api
  useEffect(() => {
    if (searchQuery) {
      const timeout = setTimeout(() => {
        fetchSearchResults();        
      }, 1000);
     return () => clearTimeout(timeout)
    }
  }, [searchQuery]);


  return (
    <>
      <div className='search-section'>
        <div>
          <h2 className='heading'>Find 'Magic: The Gathering' Cards</h2>
          <input
            type="text"
            placeholder="Search card name"
            value={searchQuery}
            onChange={updateSearchTerm}
            className='search-bar'
          />

        </div>
      </div>
      {!isError ? (
        <div className="card-container">
          {cardList.map((card) => (
            <div key={card.id} className="card">
              <img className="card-image" src={card.image_uris?.small} alt={card.name} />
              <div className="card-details">
                <p className="card-name">{card.name}</p>
                <p className="card-info">{`Collector Number: ${card.collector_number}`}</p>
                <p className="card-info">{`Set: ${card.set_name}`}</p>
                <p className="card-info">{`Rarity: ${card.rarity}`}</p>
              </div>
            </div>
          ))}
        </div>
      )
        :
        <div className='no-results'>
          <h3>No matching cards. Please try another term.</h3>
        </div>
      }
    </>

  )
}

export default App
