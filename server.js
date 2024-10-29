import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

// 建立 Express 應用
const app = express();

// 提供靜態檔案（前端頁面）
app.use(express.static("public"));

// 建立 HTTP 伺服器
const server = http.createServer(app);

// 建立 WebSocket 伺服器，並與 HTTP 伺服器共用同一個埠
const wss = new WebSocketServer({ server });

// 處理 WebSocket 連線
wss.on("connection", (ws) => {
  console.log("WebSocket 連線已建立");

  ws.on("message", (message) => {
    console.log(`收到來自 WebSocket 的訊息：${message}`);
    ws.send(`伺服器回應（WebSocket）：${message}`);
  });
});

// 處理 HTTP 請求
app.get("/api", (req, res) => {
  console.log("收到 HTTP 請求");
  res.send("伺服器回應（HTTP）");
});

// 啟動伺服器
server.listen(3000, () => {
  console.log("伺服器已啟動，請訪問 http://localhost:3000");
});
