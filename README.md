## Simple Chat Application

### Description:

Simple chat application made in Typescript using Vite React Nodejs and Stream and Fastify.

NOTE:- Stream API is used which is only free for few days.

## Technologies Used:

### Client:

- Vite
- React, React Dom
- React Router Dom
- Tailwind
- Axios
- React Query
- Stream Chat

### Server:

- Node
- Fastify
- Nodemon
- Dotenv
- Stream Chat

## Project Structure(for personal documentation):

### Client(react vite tailwind frontend client):

#### /src/main.tsx:

starting file, queryclinet and router added in root of app

#### src/router.tsx:

has the routes for client, what all element and layout to show at the particular route withing the layour, authlayour for login and signup, rootlayout for home and channel and chats, all wrapped inside the contextwrapper which is just the authprovider context with outlet(display child element for route within route ie nested routes)

#### /src/components

- /components/Button.tsx: the normal button element with styles, shows the children, used forward refs for refs and other props
- /components/FullScreenCard.tsx: A card components for making the login and signup card(just a ui component)
- /components/Input.tsx : same as button component
  -components/Link.tsx: React router Link element

#### /src/context

- /context/AuthContext: login signup logout context, mutation, communication with the server using axios request and navigation to routes on success, main authprovider context wrapping entire application

#### /src/hooks?

- /hooks/useLocalStorage.ts: custom local storage hook

#### /src/pages

##### /src/pages/channel

- /pages/channel/new.tsx???

##### /src/pages/layouts

- /pages/layouts/AuthLayout.tsx: layout for login and signup page(just a ui component wrapper)
- /pages/layouts/RootLayout.tsx: layout for home and channel page(just a ui component wrapper)
- /pages/Home.tsx: home components, comes on route '/' after login, and displays the rest of app
- /pages/Login.tsx: login components, comes on route 'login' and displays the login form and on success redirects to '/' ie home
- /pages/Signup.tsx: signup components, comes on route '/signup' and displays the signup form and on success redirects to '/login' ie login

### Server(nodejs fastify backend server):

- #### server.ts: create the fastify/express app, register with the cors and start the app on the port.
- #### routes/users.ts: all the routes: post request on /signup route, post request on /login route and return the user details, post request on /logout and logging user out deleting the chat instance

#### TO DO:

- Add proper comments in all files for understanding the workflow and review project structure
- Renew env variables and api keys with new account
