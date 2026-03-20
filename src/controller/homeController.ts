import type { Request, Response } from 'express';
import { UserRepository } from '../repository/userRepository.js';
import type { email } from 'zod';
import { activePage } from '../utils/activePage.js';

export default class HomeController {
  private repository = new UserRepository();

  public index = (req: Request, res: Response) => {
    const active = activePage('home');
    res.render('pages/home', {
      title: 'Home',
      active,
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };


  public newPost = (req: Request, res: Response)=>{

  }
}
