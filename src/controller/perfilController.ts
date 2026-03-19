import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.ts';

export class PerfilController {
  public perfil = (req: Request, res: Response) => {
    const active = activePage('perfil');

    return res.render('pages/perfil', {
      active,
    });
  };
}
