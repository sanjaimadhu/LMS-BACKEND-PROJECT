const app = require("./app");
const dotenv = require("dotenv").config();
const db = require("./db/db");
const http = require("http");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server, {
  allowEIO3: true,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addNotification", (data) => {
    console.log("from socket", data);
    io.emit("getNotification", data);
  });
});

// database connection
db();

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
