const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

// 🛡️ Trust proxy to get real client IP
app.set("trust proxy", true);

// 🔍 Log IP headers for debugging behind Ingress
app.use((req, res, next) => {
  console.log("headers", req.headers);
  console.log("X-Forwarded-For:", req.headers["x-forwarded-for"]);
  console.log("X-Real-IP:", req.headers["x-real-ip"]);
  console.log("req.ip:", req.ip);
  next();
});

// 🚦 Global Rate Limiter (10 req/min per IP)
// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 10,
//   message: "⚠️ Too many requests from this IP, please try again later.",
// });

// app.use(limiter);

// 🏠 Base Route
router.get("/", (req, res) => {
  res.send(`👋 Hello! Your IP is ${req.ip}`);
});

// ✅ Server Status
router.get("/status", (req, res) => {
  res.json({
    status: "OK",
    time: new Date().toISOString(),
    clientIP: req.ip,
  });
});

// 🧑 Dummy User Endpoint
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    id: userId,
    name: `User_${userId}`,
    email: `user_${userId}@example.com`,
  });
});

router.get("/new-test/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    id: userId,
    name: `TEST_${userId}`,
    email: `TEST__${userId}@example.com`,
  });
});

app.use("/ip-bkd", router);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
