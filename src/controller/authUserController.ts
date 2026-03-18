import type { Request, Response } from 'express';
import AuthUserService from '../service/authUserService.ts';
import { fa } from 'zod/locales';
import { schemaLogin } from '../schema/schemaAuth.ts';

export class AuthUserController {
  private authUserService: AuthUserService;

  constructor() {
    this.authUserService = new AuthUserService();
  }
  public login = (req: Request, res: Response) => {
    const message = req.flash('error');
    res.render('pages/login', { message });
  };

  public loginAction = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    console.log(password);
    const user = await this.authUserService.validadePassword(password, email);
    const { error, success } = schemaLogin(password, email);
    const message =
      error?.issues.map((issue) => issue.message).join(', ') || 'Email ou senha inválidos';

    if (!success) {
      req.flash('error', message);
      return res.redirect('/login');
    }

    if (user) {
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return res.redirect('/');
    }

    return res.redirect('/login');
  };
}
