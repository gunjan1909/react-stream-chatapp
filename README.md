## Simple Chat Application

### Description:

Simple channel based chat application made in Typescript using Vite React Nodejs and Stream and Fastify.

NOTE:- Stream API is used which is only free for few days.

### Technologies Used:

### Client:

- React, React Dom
- React Router Dom
- React Query
- Tailwind
- Vite
- Stream Chat
- Axios

### Server:

- Node
- Fastify
- Stream Chat
- Nodemon
- Dotenv

### Get Started:

- 1. clone the repository using : `git clone https://github.com/gunjan1909/react-stream-chatapp.git`
- 2. cd into the directory: `cd react-stream-chatapp`
- 3. cd into the client and server separately for running the backend server and frontend client .
- 4. run `npm install` in both folder separately to install the dependencies
- 5. in server, create a .env file and add ur keys `PORT=3000
CLIENT_URL=http://localhost:5173
STREAM_API_KEY=YOUR_KEY
STREAM_PRIVATE_API_KEY=YOUR_PRIV_KEY`
- 6. in client, create a .env file and add ur keys `VITE_SERVER_URL = http://[::1]:3000
VITE_STREAM_API_KEY=YOUR_KEY`
- 7. run both server and client using npm run dev command and start the application, server starts on port `3000` and vite react application starts on port `5173`

## Project Structure(for personal documentation):

### Client(react vite tailwind frontend client):

#### ./src/index.css:

Just imported the tailwind utilities

#### ./src/main.tsx:

Starting file, Queryclinet and Router added in root of App

#### ./src/router.tsx:

Has the routes for client, what all element and layout to show at the particular route withing the layout, authlayout for login and signup, rootlayout for home and channel and chats, all wrapped inside the contextwrapper which is just the authprovider context(logged in, user, streamchat context) with outlet(display child element for route within route ie nested routes)

#### ./src/components folder

- /components/Button.tsx: The normal button element with styles, shows the children, used forward refs for refs and other props
- /components/FullScreenCard.tsx: A card components for making the card container for forms(login,signup,new channel)(just a ui component)
- /components/Input.tsx : same as button component
  -components/Link.tsx: React router Link element

#### ./src/context folder

- /context/AuthContext: login , signup , logout context, mutation, communication with the server using axios request and navigation to routes on success, main authprovider context wrapping entire application

#### ./src/hooks folder

- /hooks/useLocalStorage.ts: custom local storage hook

#### ./src/pages folder

- /pages/Home.tsx: home components, comes on route '/' after login, and displays the rest of app
- /pages/Login.tsx: login components, comes on route '/login' and displays the login form and on success redirects to '/' ie home
- /pages/Signup.tsx: signup components, comes on route '/signup' and displays the signup form and on success redirects to '/login' ie login

##### ./src/pages/channel folder

- /pages/channel/new.tsx: form and select component to start a chat channel choose all registered users, creating the stream chat channel and on success redirecting to home using react query mutation(text.tsx(for developer only) for details)

##### ./src/pages/layouts folder

- /pages/layouts/AuthLayout.tsx: layout for login and signup page(just a ui component wrapper)
- /pages/layouts/RootLayout.tsx: layout for home and channel page(just a ui component wrapper)

### Server(nodejs fastify backend server):

- #### server.ts: create the fastify/express app, register with the cors and start the app on the port.
- #### routes/users.ts: all the routes: post request on /signup route, post request on /login route and return the user details, post request on /logout and logging user out deleting the chat instance

#### TO DO:

- Add proper comments in all files for understanding the workflow and review project structure
- Renew env variables and api keys with new stream account once expired
- Test entire application with multiple users
