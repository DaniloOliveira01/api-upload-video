/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import multer from "multer";
import path from "path";

class UploadService {
  private storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  private upload = multer({
    storage: this.storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Limite de tamanho do arquivo (10MB)
    },
  }).single("video");

  async uploadVideo(req: Request) {
    return new Promise<{ filename: string; size: number }>(
      (resolve, reject) => {
        this.upload(req, null as any, async (err: any) => {
          if (err) {
            reject(new Error("Error uploading video: " + err.message));
            return;
          }

          if (!req.file) {
            reject(new Error("No video uploaded"));
            return;
          }

          resolve({
            filename: req.file.filename,
            size: req.file.size,
          });
        });
      },
    );
  }
}

export { UploadService };
