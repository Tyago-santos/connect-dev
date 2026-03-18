import type { Request, Response } from 'express';
import { UserRepository } from '../repository/userRepository.ts';
import type { email } from 'zod';

export default class HomeController {
  private repository = new UserRepository();

  public index = (req: Request, res: Response) => {
    res.render('pages/home', {
      title: 'Home',
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };
}
