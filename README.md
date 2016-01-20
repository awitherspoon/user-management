# user-management
Front end user management example

## How to run it
```
git clone <this repo> && cd user-management
npm install
npm run dev
```
Then go to localhost:3000 on your preferred browser.

There's still a smattering of bugs laying around and the styles aren't at all as well defined as I'd prefer, making it as a standalone React project was more time consuming than I imagined it would be!  Regardless, the basic functionality is there.  The backend is being simulated (ultimately) by a redux store, and so the "API endpoints" are simulated when action creators dispatch.  Spent the last little bit of time adding a few unit tests, ideally every component and reducer/action creator method would be tested.

Some of the features:
* (totally fake) authentication
* Input verification
* User detail (click the user's name on the users page to see a messy list of what groups they are in)
* Group detail (The group creation and detail/editing is part of the same groups page, separated in to different components)
* A quasi-simulated many-to-many relationship between users and groups, deleting one alters the other
