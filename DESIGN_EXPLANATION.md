# Design Decisions and Thoughts

- The app contains a search box for the user to query the api and see a list of cards in a well formatted way. The cards also show the necessary details about the card.

- Although a simple project of this size doesn't need it, I separated interfaces into their own model folder for cleaner architecture if the project grew. This also makes it easier to test the project by a more loosly coupled architecture. Similarily, the index.ts was kept clean but moving the api call out of them. I put the api endpoints in a controller file. Again, not necessary for a small project, but if it were to grow, this promotes cleaner architecture

- I created a test for the api and put it in __tests__ folder. The test uses Jest and supertest. My test only mocks the api, which is proper practice for a unit test in order to isolate the unit of code. However, I could also test the actual API

- I made a manual debounce implementaion, I could also use lodash, but it is not worth the overhead. The API call is only sent out after the user stops typing for one second. This also fulfills the 1 API call per second requirement, as the api call only gets sent out after one second at a minimum



Further improvements:

- I could show all cards when no search term specified, and thus clearing the search box could show all the cards (since no filter applied). Currently, clearing the search box has no affect on current display of cards. Alternatively, clearing the search box could reset the state to where no cards are shown, as is the current state on page load

- The scryfall api is an environment variable. I could also put front end url (http://localhost:3001/api/search) in .env file too

- Pagination and sorting would improve the user experience, so would a loading indicator for when the user is done typing in their search term and await the results

- Some of the images are not available from the API and thus show a broken file icon on the frontend. It would be better UI to handle this error in a nicer way, ie) Show 'Image not found' instead of this icon