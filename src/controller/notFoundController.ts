import type { Request, Response } from 'express';

export default class NotFoundController {
  public index = (req: Request, res: Response) => {
    res.status(404).render('pages/404');
  };
}
