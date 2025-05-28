// server.js const express = require("express"); const fetch = require("node-fetch"); const cors = require("cors");

const app = express(); app.use(cors());

app.get("/proxy", async (req, res) => { const { url } = req.query;

if (!url) return res.status(400).send("No URL provided");

try { const streamRes = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36", "Referer": req.query.referer || "", }, });

res.set("Content-Type", streamRes.headers.get("content-type") || "application/vnd.apple.mpegurl");
streamRes.body.pipe(res);

} catch (err) { res.status(500).send("Error fetching stream: " + err.message); } });

const PORT = process.env.PORT || 3000; app.listen(PORT, () => console.log(✅ Proxy server running on port ${PORT}));

