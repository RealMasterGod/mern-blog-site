# Blog Site
Demo link: https://mern-blog-site-client-git-main-realmastergods-projects.vercel.app/

# Table of Content

1. About The App
2. Technologies
3. Prerequisites
4. Setup
5. Status

# 1. About The App
Blog site is a blog web app. You can read blogs uploaded by other users, you can also register and login to create your own blogs.
Blogs may have categories so users and query all blogs of a particular category.
Users can also update their account.

# 2. Technologies
I have used  ReactJs, Vite to create the frontend and it uses context API.
The backend is done in Node/ExpressJs and it uses mongodb as database.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### To create your own react + vite app run this command:
```bash
npm create vite@latest --your-app-name -- --template react
```
Or you may refer to https://vitejs.dev/guide/   for more details.

## NodeJs

NodeJs has become a popular choice for writing backend. It has many advantages but the most convienent is that it let's us write backend in JavaScript
Refer to https://nodejs.org/en to learn more about it

## ExpressJs

It is a web framework for node.js. Writing backend in plain Node.js is possible, however it'd a tiresome job, using express.js makes it easier and faster 
to work with node.js
To add it to your project use:
```bash
npm i express
```
Learn about express.js https://expressjs.com/

## MongoDb

A nosql database that is popular nowadays is mongodb specially when it comes to node.js.
To add it to your project use:
```bash
npm i mongoose
```
Refer to https://mongoosejs.com/ for more information


# 3. Prerequisites
## Install Node Package Manager
Refer to https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

# 4. Setup
- Clone the repository or download as zip.
- Go to the cloned folder on your local machine.
- Open terminal in api folder and also create a .env file where you have to create a variable MONGODB_URI and assign your mongodb database to this. 
- Open terminal and run the following commands in order.
  ```bash
  npm install
  ```
  ```bash
  npm run dev
  ```
- Similarly open terminal in client folder and also create a .env file where you have to create a variable REACT_APP_BASE_URL and assign the url your api is running on.
- Now in client folder just run the above two commands.
- Now just click/copy the link that would appear in the console and paste on your browser and hit enter. That's it you can now see the project on your local machine.

# 5. Status
The project is almost complete. There may be minor things that I can do and I will do when I get time.

