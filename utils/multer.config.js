import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, '../uploads/userPhotos');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),

  filename: (req, file, cb) => {
    // Get the file extension
    const ext = path.extname(file.originalname);
    // Get the filename without the extension
    const nameWithoutExt = path.basename(file.originalname, ext);
    // Generate a unique filename by prefixing it with 'user_<filename>_Date.now()<filename>'
    const uniqueName = `user_${nameWithoutExt}_${Date.now()}${ext}`;
    // Call the callback function with the generated filename
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;

    const ext = allowedTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (ext && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
