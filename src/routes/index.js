import express from "express";
import booksRoutes from './booksRoutes.js';
import authorsRoutes from './authorsRoutes.js'

const routes = (app) => {
  app.get('/', (req, res) => {
    res.status(200).send({title: 'Node course'});
  });

  app.use(
    express.json(),
    booksRoutes,
    authorsRoutes
  )
}

export default routes;