const express = require("express");
const cors = require("cors");
const app = express();
//
// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Server is listening</h1>");
});

// import routes
const bookRoute = require("./routes/bookRoute.js");
const userRoute = require("./routes/userRoute.js");
const borrowedBookRoute = require("./routes/borrowedBookRoute");
const requestedBookRoute = require("./routes/requestedBookRoute.js");
const noticeRoute = require("./routes/noticeRoute.js");
const monthRoute = require("./routes/monthRoute.js");
const articleRoute = require("./routes/articleRoute.js");
const notificationRoute = require("./routes/notificationRoute.js");

// api routes
app.use("/api/v1/book", bookRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/borrowedBook", borrowedBookRoute);
app.use("/api/v1/requestedBook", requestedBookRoute);
app.use("/api/v1/notice", noticeRoute);
app.use("/api/v1/month", monthRoute);
app.use("/api/v1/article", articleRoute);
app.use("/api/v1/notification", notificationRoute);

module.exports = app;
