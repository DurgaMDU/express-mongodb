module.exports = app => {
  const Launches = require("../controllers/launches.controller.js");

  var router = require("express").Router();

  // Create a new Launches
  router.post("/", Launches.create);
  
  // Find and update launches
  router.patch('/:id', Launches.update);


  // Retrieve all Launches
  router.get("/", Launches.findAll);


  // Delete a Launches with id
  router.delete("/:id", Launches.delete);


  app.use("/api/launches", router);
};
