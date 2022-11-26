const Prop = require("../models/prop");

const fetchProps = async (req, res) => {
  try {
  // Find the props
  const props = await Prop.find({ user: req.user._id });

  // Respond with them
  res.json({ props });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const fetchProp = async (req, res) => {
  try {
  // Get id off the url
  const propId = req.params.id;

  // Find the prop using that id
  const prop = await Prop.findOne({ _id: propId, user: req.user._id });

  // Respond with the prop
  res.json({ prop });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createProp = async (req, res) => {
  try {
  // Get the sent in data off request body
  const { item, dollarVal, dateAquired } = req.body;

  // Create a prop with it
  const prop = await Prop.create({
    item,
    dollarVal,
    dateAquired,
    user: req.user._id,
  });

  // respond with the new prop
  res.json({ prop });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateProp = async (req, res) => {
  try {
  // Get the id off the url
  const propId = req.params.id;

  // Get the data off the req body
  const { item, dollarVal, dateAquired } = req.body;

  // Find and update the record
  await Prop.findOneAndUpdate(
    { 
    _id: propId, 
    user: req.user._id
    }, {
    item,
    dollarVal,
    dateAquired,
    }
  );

  // Find updated prop
  const prop = await Prop.findById(propId);

  // Respond with it
  res.json({ prop });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteProp = async (req, res) => {
  try {
  // get id off url
  const propId = req.params.id;

  // Delete the record
  await Prop.deleteOne({ id: propId, user: req.user._id});

  // Respond
  res.json({ success: "Record deleted" });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  fetchProps,
  fetchProp,
  createProp,
  updateProp,
  deleteProp,
};
 