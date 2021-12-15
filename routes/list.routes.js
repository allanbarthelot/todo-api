const express = require("express");
const listControllers = require("../controllers/list.controllers");

const router = express.Router();

router.get("/", listControllers.getLists);
router.post("/", listControllers.addList);
router.delete("/:id", listControllers.deleteList);
router.patch("/:id", listControllers.updateList);

module.exports = router;
