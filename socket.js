// socket.js
export default function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("🔗 Socket connected:", socket.id);

    socket.on("listenToChild", (childId = "child1") => {
      const roomName = `parent:${childId}`;
      socket.join(roomName);
      console.log(`👨 Parent joined room: ${roomName}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
}
