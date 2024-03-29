Go to the link for the UI-Preview: [fronend/README.md](https://github.com/sayakghorai34/Library-Management-System/blob/main/frontend/README.md)

## Basic Run Through of the Project

https://github.com/sayakghorai34/Library-Management-System/assets/98743263/528a924a-3c8b-4e87-aec5-ca0568a98ff5


 
## How to run the project
1. Clone the repository
```
git clone https://github.com/sayakghorai34/Library-Management-System.git
```
2. Open the terminal and navigate to the project directory
```
cd Library-Management-System
```
3. Go to `backend` directory and install dependencies
```
cd backend
npm install
```
4. rename the `.env.example` file to `.env` and add the following environment variables
```
PORT=define any suitable port
MONGODB_URI=your mongodb connection string
```
5. Run the following command to start the server
```
npm start
```
## How to run the Client
1. Go to the `frontend` directory and install the dependencies
```
cd frontend
npm install
```
2. rename the `.env.example` file to `.env` and add the following environment variables

3. Run the following command to start the client
```
npm start
```
4. Open the browser and navigate to `http://localhost:3000/` to view the client

# Note:
 - Test(useless).js is just a checking file to see if the server is running or not. It is not a part of the project
 - Run the server before running the client(else the client will not fetch data until the server is running)
 - The project is still under development and some features may not work as expecte 
 - the `npm start` command will start the server using nodemon. To change the behaviour, change the `start` script in `package.json` file in the `backend` directory

# Contributed by:
 - Sayak Ghorai [(github/sayakghorai34)](https://github.com/sayakghorai34), 29th May 2024 
