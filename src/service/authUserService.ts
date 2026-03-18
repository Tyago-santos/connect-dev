import { fa, tr } from 'zod/locales';
import { UserRepository } from '../repository/userRepository.ts';
import { schemaLogin } from '../schema/schemaAuth.ts';
import { Hash } from '../utils/hash.ts';

export default class AuthUserService {
  private bycrypt: Hash;
  private repository: UserRepository;
  constructor() {
    this.bycrypt = new Hash();
    this.repository = new UserRepository();
  }

  public validadePassword = async (password: string, email: string) => {
    const user = await this.repository.getUserByEmail(email);
    if (!user) return false;
    const hashCompare = (await this.bycrypt.comparePassword(password, user.password)) ?? false;

    if (hashCompare) {
      return { id: user.id, name: user.name, email: user.email };
    } else {
      return false;
    }
  };
}
