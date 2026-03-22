import { PerfilRepository } from '../repository/perfilRepository.js';

interface UserRow {
  id: number;
  name: string;
  password: string;
  email: string;
}

export class PerfilService {
  private repository: PerfilRepository;

  constructor() {
    this.repository = new PerfilRepository();
  }

  public getPerfil = async (id: number): Promise<UserRow | undefined> => {
    const user = await this.repository.getPerfil(id);
    if (user) return user;
  };
}
