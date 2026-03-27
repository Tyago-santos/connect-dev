import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'avatar') {
      cb(null, 'public/media/avatars/');
    } else if (file.fieldname === 'cover') {
      cb(null, 'public/media/covers/');
    } else {
      cb(null, 'public/media/uploads/');
    }
  },
  filename: (req, file, cb) => {
    const userId = req.session.user?.id || 'temp';
    const ext = path.extname(file.originalname);
    cb(null, `${userId}${ext}`);
  },
});

export const uploadConfig = multer({ storage: storage });
