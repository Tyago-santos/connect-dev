import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';

export class PerfilController {
  public perfil = (req: Request, res: Response) => {
    const active = activePage('perfil');

    return res.render('pages/perfil', {
      active,
    });
  };
}
