import type { Request, Response } from 'express';
import  AuthUserService from '../service/authUserService.ts';

export class AuthUserController {
  private authUserService: AuthUserService;

  constructor() {
    this.authUserService = new AuthUserService();
  }
  public login = (req: Request, res: Response) => {
    const { password, email } = req.body;
    const validadeLogin = this.authUserService.login(password, email);
    if (validadeLogin.error) {
    }
    res.render('pages/login');
  };

  public loginAction = (req: Request, res: Response) => {};
}
