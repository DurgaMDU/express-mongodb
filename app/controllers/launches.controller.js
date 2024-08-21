const db = require("../models");
const Launches = db.launches;

// Create and Save a new Launches
exports.create = (req, res) => {
	// Validate request
	if (!req.body.flight_number) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	// Create a Launches
	const launchesdata = req.body;
	const LaunchesCollection = new Launches(launchesdata)
	  // Save Launches in the database
	  LaunchesCollection.save(launchesdata)
		.then(data => {
		  res.send(data);
		})
		.catch(err => {
		  res.status(500).send({
			message:
			  err.message || "Some error occurred while creating the Launches."
		  });
		});
};

// Retrieve all Launches from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Launches.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Launches."
      });
    });
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
	const launchesdata = req.body;
    //useFindAndModify: false
    await Launches.findByIdAndUpdate(id, launchesdata, { new: true }).then(data => {
        if (!data) {
            //res.status(404).send({ message: `Launches not found.` });
			const LaunchesCollection = new Launches(launchesdata)
			// Save Launches in the database
			LaunchesCollection.save(launchesdata).then(data => {
				res.send({ message: "Launches Saved successfully on "+new Date().toLocaleString() });
			}).catch(err => {
			  res.status(500).send({ message: err.message || "Some error occurred while creating the Launches." });
			});
        }else{
            res.send({ message: "Launches updated successfully on "+new Date().toLocaleString() })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a Launches with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Launches.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Launches with id=${id}. Maybe Launches was not found!`
        });
      } else {
        res.send({
          message: "Launches was deleted successfully on "+new Date().toLocaleString()
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Launches with id=" + id
      });
    });
};
