import type { Request, Response } from 'express';
import AuthUserService from '../service/authUserService.js';

import { schemaLogin, schemaRegister } from '../schema/schemaAuth.js';

export class AuthUserController {
  private authUserService: AuthUserService;

  constructor() {
    this.authUserService = new AuthUserService();
  }
  public login = (req: Request, res: Response) => {
    const message = req.flash('error');
    res.render('pages/login', { message });
  };

  public register = (req: Request, res: Response) => {
    const message = req.flash('error');
    res.render('pages/register', { message });
  };

  public loginAction = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    console.log(password);
    const user = await this.authUserService.loginService(password, email);
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

  public registerAction = async (req: Request, res: Response) => {
    const { password, email, name } = req.body;

    const { error, success } = schemaRegister(password, email, name);
    const message =
      error?.issues.map((issue) => issue.message).join(', ') || 'Email ou senha inválidos';

    if (!success) {
      req.flash('error', message);
      return res.redirect('/register');
    }

    try {
      const user = await this.authUserService.createUser(password, email, name);

      if (user) {
        req.session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        return res.redirect('/');
      } else {
        req.flash('error', 'Email ja existe');
      }
    } catch (err) {
      console.error('Erro ao registrar usuario:', err);
      req.flash('error', 'Erro interno ao criar usuario');
    }

    return res.redirect('/register');
  };
}
