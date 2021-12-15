const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

var cors = require("cors");

const listRouter = require("./routes/list.routes");
const todoRouter = require("./routes/todo.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();
app.use(cookieParser());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const con = mongoose.connection;

con.on("open", function () {
  console.log("connected to db...");
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRouter);

app.use(authMiddleware);
app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/todo", todoRouter);

app.listen(9000, () => {
  console.log("Server started");
});

module.exports = app;
