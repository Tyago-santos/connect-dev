import { UserRepository } from '../repository/userRepository.js';
import { uploadImage, AVATARS_FOLDER, COVERS_FOLDER, deleteImage } from '../services/supabase.js';

export class UploadService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async uploadAvatar(userId: number, file: Express.Multer.File): Promise<string> {
    const fileName = `avatar_${userId}_${Date.now()}`;
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
    const fileName = `cover_${userId}_${Date.now()}`;
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
