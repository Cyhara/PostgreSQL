import express from 'express';

const applyMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default applyMiddlewares;
