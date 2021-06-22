# Events API 

Event APIs application using express, mongoose

## Summary
Event API for creating, deleting, reading and updating events, users and houses. Reference: based in new residential zones that have public areas that can be reserved.

## Dependencies used
express, mongoose, jsonwebtoken, bcrypt, express-async-handler

### Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs the app in the development mode with nodemon.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm run start`
Run the app.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run data:import`
Run the seeder that will delete all documents in the DB and upload the data to the DB in the /api/data/ folder.

#### `npm run data:import`
Run the seeder that will delete all documents in the DB.