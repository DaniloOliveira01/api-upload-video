import express from "express";

import { UploadController } from "./controllers/UploadController";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", UploadController.uploadVideo);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
