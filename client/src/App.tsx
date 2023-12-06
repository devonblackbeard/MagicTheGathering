import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import { debounce } from 'lodash';


function App() {

  interface image_uri { //TODO : move these to separate file, fix cursor size, width of search bar, spacing of card details, image not found, sorting, pagination
    small: string
    normal: string
    large: string
    png: string
  }

  interface Card {
    id: number
    name: string
    collector_number: number
    rarity: string
    image_uris: image_uri
    set_name: string
  }

  interface Response {
    data: Card[]
    total_cards: number
    error: string
  }

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cardList, setCardList] = useState<Card[]>([]);
  const [isError, setIsError] = useState<boolean>(false);



  const fetchSearchResults = async () => {
    try {
        //console.log("Sending ", searchQuery);        
        const response = await fetch(`http://localhost:3001/api/search?term=${searchQuery}`); //const response = await fetch(`${baseUrl}/api/search`);
        const responseObj = await response.json() as Response;
        
        if (responseObj.error) {
          setIsError(true)        
        }
        else
        {
          console.log('obj', responseObj);
          
          setCardList(responseObj.data)
          setIsError(false)        
        }
       
    } catch (error) {
        console.error('Error sending GET request:', error);      
        setIsError(true)
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
    //A-Devoted Grafkeeper // A-Departed Soulkeeper FIX THIS IMAGE

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
      { !isError ? (
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
