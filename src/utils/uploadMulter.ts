import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/media/uploads/'); // Pasta onde salvar
  },
  filename: (req, file, cb) => {
    // Salva com timestamp + nome original para evitar conflitos
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadMulter = multer({ storage: storage });
