// controllers/UploadController.ts
import { Request, Response } from "express";

import { UploadService } from "../services/UploadService";

class UploadController {
  static async uploadVideo(req: Request, res: Response) {
    try {
      const uploadService = new UploadService();
      const video = await uploadService.uploadVideo(req);
      res.status(201).json({ message: "Video uploaded successfully", video });
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { UploadController };
