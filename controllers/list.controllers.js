const List = require("../models/list");

const addList = async (req, res) => {
  const list = new List({
    name: req.body.name,
  });

  const user = req.decoded.id;

  list.author = user;

  try {
    const savedList = await list.save();
    res.json(savedList);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};

const getLists = async (req, res) => {
  const user = req.decoded.id;

  try {
    const lists = await List.find({ author: user });
    res.json(lists);
  } catch (err) {
    res.send("error");
  }
};

const deleteList = async (req, res) => {
  try {
    const deletedList = await List.deleteOne({ _id: req.params.id });
    res.json(deletedList);
  } catch (err) {
    res.send("error");
  }
};

const updateList = async (req, res) => {
  try {
    const updatedList = await List.updateOne(
      { _id: req.params.id },
      { name: req.body.name }
    );

    res.json(updatedList);
  } catch (err) {
    res.send("error");
  }
};

module.exports = {
  addList,
  getLists,
  deleteList,
  updateList,
};
