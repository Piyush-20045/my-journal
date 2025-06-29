require("dotenv").config();

const express = require("express");
const cors = require("cors");
const ImageKit = require("imagekit");

const app = express();
app.use(cors());
app.use(express.json());

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Route to get authentication params
app.get("/auth", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.json({
    ...result,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});

// Route to delete the image permanently
app.post("/api/delete-image",
  async (req, res) => {
    const { fileId } = req.body;

    try {
      await imagekit.deleteFile(fileId);
      res.send({ success: true })
    } catch (err) {
      res.status(500).send({ error: "Failed to delete image" })
    }
  });

app.listen(5000, () => {
  console.log("ImageKit auth server running on http://localhost:5000");
});