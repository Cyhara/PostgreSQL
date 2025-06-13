import express from 'express';
import bodyParser from 'body-parser';

const applyMiddlewares = (app) => {
  app.use(bodyParser.json()); // or use express.json() instead
  app.use(express.urlencoded({ extended: true }));
};

export default applyMiddlewares;