import multer from 'multer';

// Store uploads in memory so we can forward the raw buffer to Supabase.
// Disk storage was leaving `file.buffer` undefined, breaking uploads.
const storage = multer.memoryStorage();

export const uploadConfig = multer({ storage });
