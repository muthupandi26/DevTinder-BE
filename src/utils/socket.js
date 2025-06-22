const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    //Handle Events
    socket.on("joinChat", ({ userId, toUserId }) => {
      const roomId = [userId, toUserId].sort().join("_");

      console.log("joining Room: " + roomId);
      socket.join(roomId);
    });
    socket.on("sendMessage", ({ firstName, userId, toUserId, text }) => {
      const roomId = [userId, toUserId].sort().join("_");
      console.log(firstName, text, "MessageRecieved");

      io.to(roomId).emit("messageReceived", { firstName, text });
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
