import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// -----------------------
// SOCKET.IO SETUP
// -----------------------
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// When a parent connects
io.on("connection", (socket) => {
  console.log("🔗 Parent connected:", socket.id);

  // Parent subscribes to child1
  socket.on("listenToChild", () => {
    socket.join("parent:child12");
    console.log("👨 Parent joined room: parent:child1");
  });

  socket.on("disconnect", () => {
    console.log("❌ Parent disconnected:", socket.id);
  });
});

// -----------------------
// CHILD LONG-POLLING API
// -----------------------

app.get("/", (req, res) => {
  res.send("🚀 Backend running on http://localhost:4000");
})
app.post("/api/child/location", async (req, res) => {
  const { lat, lng } = req.body;

  console.log("📍 Child1 sent new location:", { lat, lng });

  // Emit to parent dashboard in real-time
  io.to("parent:child1").emit("locationUpdate", {
    childId: "child1",
    lat,
    lng,
    ts: Date.now(),
  });

  res.json({ success: true, message: "Location updated" });
});

// -----------------------
// SERVER START
// -----------------------
server.listen(4000, () => {
  console.log("🚀 Backend running on http://localhost:4000");
});
