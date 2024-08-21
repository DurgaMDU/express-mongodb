module.exports = mongoose => {
	// strict false will allow you to save document which is coming from the req.body
	var schema = mongoose.Schema( {}, { strict: false }  );
	const Launches = mongoose.model("launches", schema);
	return Launches;
};
