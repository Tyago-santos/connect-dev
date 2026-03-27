import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import ConfigService from '../service/configService.js';
import { UserRepository } from '../repository/userRepository.js';
import { UploadService } from '../service/uploadService.js';

export class ConfigController {
  private service: ConfigService;
  private userRepository: UserRepository;
  private uploadService: UploadService;

  constructor() {
    this.service = new ConfigService();
    this.userRepository = new UserRepository();
    this.uploadService = new UploadService();
  }
  public config = async (req: Request, res: Response) => {
    const active = activePage('config');

    return res.render('pages/config', {
      active,
      perfilAvatar:
        !req.session.user?.avatar || req.session.user.avatar === '0'
          ? '/media/avatars/avatar.jpg'
          : req.session.user.avatar,
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
        city: req.session.user?.city,
        work: req.session.user?.work,
        avatar: req.session.user?.avatar,
        cover: req.session.user?.cover,
      },
    });
  };

  public configAction = async (req: Request, res: Response) => {
    const { email, name, work, city } = req.body;
    const userId = req.session.user?.id;
    const currentUser = req.session.user;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!userId || !currentUser) {
      req.flash('error', 'Sessão expirada. Faça login novamente.');
      return res.redirect('/login');
    }

    const avatarFile = files?.avatar?.[0];
    const coverFile = files?.cover?.[0];
    const hasFiles = avatarFile || coverFile;

    const nextEmail = (email || '').trim() || currentUser.email;
    const nextName = (name || '').trim() || currentUser.name;
    const nextWork = (work || '').trim() || currentUser.work || null;
    const nextCity = (city || '').trim() || currentUser.city || null;

    const hasTextChanges =
      nextName !== currentUser.name ||
      nextEmail !== currentUser.email ||
      nextWork !== (currentUser.work || null) ||
      nextCity !== (currentUser.city || null);

    if (!hasTextChanges && !hasFiles) {
      req.flash('error', 'Precisa alterar algum campo');
      return res.redirect('/config');
    }

    if (hasTextChanges) {
      const updateUser = await this.service.updateUser(
        userId,
        nextEmail,
        nextName,
        nextCity,
        nextWork,
      );

      if (!updateUser.ok) {
        req.flash('error', 'E-mail já em uso');
        return res.redirect('/config');
      }
    }

    let avatar = currentUser.avatar ?? '';
    let cover = currentUser.cover ?? '';

    if (avatarFile) {
      avatar = await this.uploadService.uploadAvatar(userId, avatarFile);
    }

    if (coverFile) {
      cover = await this.uploadService.uploadCover(userId, coverFile);
    }

    const newSession = { ...currentUser };
    newSession.name = nextName;
    newSession.email = nextEmail;
    newSession.work = nextWork ?? undefined;
    newSession.city = nextCity ?? undefined;
    if (avatar) newSession.avatar = avatar;
    if (cover) newSession.cover = cover;
    req.session.user = newSession;

    req.flash('success', 'Dados atualizados com sucesso');
    return res.redirect('/config');
  };
}
