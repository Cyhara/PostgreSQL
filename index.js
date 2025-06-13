// Express server
import express from "express";
import bodyParser from "body-parser"; 
import userRoutes from "./routes/userRoutes.js";
import applyMiddlewares from './middlewares/index.js';


const app = express();

const PORT = 5000;

applyMiddlewares(app);



app.use('/api', userRoutes);



//Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Error starting server:', error);
});
//app.listen(PORT, () => {
  //  console.log(`Server is running on port ${PORT}`);
//});