import fs from 'fs/promises';
import * as FileType from 'file-type';



export const typeValidation = async (req, res, next) => {
  if (!req.file) return next(new AppError('No file uploaded', 400));

  // Read the file buffer
  const bufferData = await fs.readFile(req.file.path);

  // Get the file type from the buffer
  const fileType = await FileType.fromBuffer(bufferData);

  // Check if the file type is valid
  if (
    !fileType ||
    !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
      fileType.mime
    )
  ) {
    return next(new AppError('Invalid file type', 400));
  }

  // If the file type is valid, continue with the next middleware
  next();
};
