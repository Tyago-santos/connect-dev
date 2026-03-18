import type { Request, Response } from 'express';
import { UserRepository } from '../repository/userRepository.ts';

export default class HomeController {
  private repository = new UserRepository();

  public index = (req: Request, res: Response) => {
    this.repository.getUsers();
    res.render('pages/home', { title: 'Home' });
  };
}
