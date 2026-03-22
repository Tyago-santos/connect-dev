import { PerfilRepository } from '../repository/perfilRepository.js';
import { RelationsRepository } from '../repository/relationsRepository.js';

interface UserRow {
  id: number;
  name: string;
  password: string;
  email: string;
}

type RelationsTo = {
  user_from: number;
};

type RelationsFrom = {
  user_to: number;
};
type UsersRelationsType = {
  user: UserRow;
  relationsTo: RelationsTo[];
  relationsFrom: RelationsFrom[];
};

export class PerfilService {
  private repositoryPerfil: PerfilRepository;
  private repositoryRelations: RelationsRepository;

  constructor() {
    this.repositoryPerfil = new PerfilRepository();
    this.repositoryRelations = new RelationsRepository();
  }

  public getPerfil = async (
    id: number,
  ): Promise<UsersRelationsType | undefined> => {
    const user = await this.repositoryPerfil.getPerfil(id);
    const relationsTo = await this.repositoryRelations.RelationsTo(id);
    const relationsFrom = await this.repositoryRelations.relatiosFrom(id);
    if (user && relationsTo && relationsFrom)
      return {
        user,
        relationsTo,
        relationsFrom,
      };
  };
}
