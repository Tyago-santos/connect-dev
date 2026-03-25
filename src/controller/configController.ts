import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import ConfigService from '../service/configService.js';

export class ConfigController {
  private service: ConfigService;

  constructor() {
    this.service = new ConfigService();
  }
  public config = async (req: Request, res: Response) => {
    const active = activePage('config');

    return res.render('pages/config', {
      active,
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };

  public configAction = async (req: Request, res: Response) => {
    const { email, name, work, city } = req.body;
    const userId = req.session.user?.id;
    const currentUser = req.session.user;

    if (!userId || !currentUser) {
      req.flash('error', 'Sessão expirada. Faça login novamente.');
      return res.redirect('/login');
    }

    const nextEmail = (email || '').trim() || currentUser.email;
    const nextName = (name || '').trim() || currentUser.name;
    const nextWork =
      (work || '').trim() || currentUser.work || null;
    const nextCity =
      (city || '').trim() || currentUser.city || null;

    if (!nextName && !nextEmail && !nextWork && !nextCity) {
      req.flash('error', 'Precisa alterar algum campo');

      return res.redirect('/config');
    }

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

    req.session.user = {
      id: userId,
      name: nextName,
      email: nextEmail,
      work: nextWork,
      city: nextCity,
    };

    req.flash('success', 'Dados atualizados com sucesso');
    return res.redirect('/config');
  };
}
