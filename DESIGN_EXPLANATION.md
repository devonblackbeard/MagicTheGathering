# Design Decisions and Thoughts

- Separated interfaces into their own model folder for cleaner architecture if the project grew. Also makes it easier to test the project
- used cors
- would put front end in .env file too but wasnt working
- made a manual debounce implementaion, could also use lodash but dont want the overhead. The api call is only sent out after the user stops typing for one second. This also fulfills the 1 api call per second requirement, as the api call only gets sent out after one second minimum

Further improvements:
- could show all cards when no search term specified, and thus clearing the search box could show all the cards (since no filter applied). Currently, clearing the search box has no affect on current display of cards. Alternatively, clearing the search box could reset the state to where no cards are shown, as is the current state on page load.
- index.ts should be kept clean, I put the api endpoints in a controller file. Again, not necessary for a small project, but if it were to grow, this promotes cleaner architecture.
- Pagination and sorting would improve the user experience, so would a loading indicator
- Some of the images are not available from the API and thus show a broken file icon on the frontend. It would be better UI to handle this error in a nicer way, ie) Show 'Image not found' instead of this icon