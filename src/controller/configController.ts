import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PerfilService } from '../service/perfilService.js';

export class ConfigController {
  private service: PerfilService;

  constructor() {
    this.service = new PerfilService();
  }
  public config = async (req: Request, res: Response) => {
    const active = activePage('config');

    return res.render('pages/config', {
      active,
    });
  };
}
