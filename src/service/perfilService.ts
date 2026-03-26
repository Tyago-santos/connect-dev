import { PerfilRepository } from '../repository/perfilRepository.js';
import {
  RelationsRepository,
  type RelationsFrom,
  type RelationsTo,
} from '../repository/relationsRepository.js';

interface UserRow {
  id: number;
  name: string;
  password: string;
  email: string;
}

type UsersRelationsType = {
  user: UserRow;
  relationsTo: RelationsFrom[];
  relationsFrom: RelationsTo[];
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
    const relationsTo = await this.repositoryRelations.relationsTo(id);
    const relationsFrom = await this.repositoryRelations.relationsFrom(id);
    if (user && relationsTo && relationsFrom)
      return {
        user,
        relationsTo,
        relationsFrom,
      };
  };

  public getRelationsFrom = async (
    id: number,
  ): Promise<
    | {
        users: UserRow[] | undefined;
      }
    | undefined
  > => {
    const followers = await this.repositoryRelations.relationsFrom(id);
    if (followers) {
      const usersFrom = await this.repositoryPerfil.getAllPerfilFrom(followers);

      return {
        users: usersFrom,
      };
    }
  };

  public getRelationsTo = async (
    id: number,
  ): Promise<
    | {
        users: UserRow[] | undefined;
      }
    | undefined
  > => {
    const followers = await this.repositoryRelations.relationsTo(id);
    if (followers) {
      const usersTo = await this.repositoryPerfil.getAllPerfilTo(followers);

      return {
        users: usersTo,
      };
    }
  };

  public isRelationsService = async (
    idUser: number,
    idPerfil: number,
  ): Promise<boolean> => {
    const followers = await this.repositoryRelations.isRelations(
      idUser,
      idPerfil,
    );
    if (followers) {
      return true;
    } else {
      return false;
    }
  };

  public follerDeleteAndInsert = async (idUser: number, id: number) => {
    const isFoller = await this.isRelationsService(idUser, id);

    if (isFoller) {
      await this.repositoryRelations.deleteFollers(idUser, id);

      return !isFoller;
    } else {
      await this.repositoryRelations.insertFollers(idUser, id);

      return false;
    }
  };
}
