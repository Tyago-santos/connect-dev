import { UserRepository } from '../repository/userRepository.js';
import { uploadImage, AVATARS_FOLDER, COVERS_FOLDER } from '../services/supabase.js';
import path from 'node:path';

const getFileExtension = (file: Express.Multer.File) => {
  // Try mimetype first, fallback to original name, default jpg.
  const extFromMime = file.mimetype?.split('/')?.[1] ?? '';
  const ext =
    extFromMime ||
    path.extname(file.originalname || '').replace('.', '') ||
    'jpg';
  return ext.startsWith('.') ? ext.slice(1) : ext;
};

export class UploadService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async uploadAvatar(userId: number, file: Express.Multer.File): Promise<string> {
    const ext = getFileExtension(file);
    const fileName = `avatar_${userId}_${Date.now()}.${ext}`;
    const publicUrl = await uploadImage(
      file.buffer,
      AVATARS_FOLDER,
      fileName,
      file.mimetype
    );

    await this.userRepository.updateAvatar(userId, publicUrl);
    return publicUrl;
  }

  async uploadCover(userId: number, file: Express.Multer.File): Promise<string> {
    const ext = getFileExtension(file);
    const fileName = `cover_${userId}_${Date.now()}.${ext}`;
    const publicUrl = await uploadImage(
      file.buffer,
      COVERS_FOLDER,
      fileName,
      file.mimetype
    );

    await this.userRepository.updateCover(userId, publicUrl);
    return publicUrl;
  }
}
