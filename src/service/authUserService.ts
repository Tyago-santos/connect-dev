import { UserRepository } from '../repository/userRepository.js';
import { Hash } from '../utils/hash.js';

export default class AuthUserService {
  private bycrypt: Hash;
  private repository: UserRepository;
  constructor() {
    this.bycrypt = new Hash();
    this.repository = new UserRepository();
  }

  public loginService = async (password: string, email: string) => {
    const user = await this.repository.getUserByEmail(email);
    if (!user) return false;
    const hashCompare =
      (await this.bycrypt.comparePassword(password, user.password)) ?? false;

    if (hashCompare) {
      return { id: user.id, name: user.name, email: user.email };
    } else {
      return false;
    }
  };

  public createUser = async (password: string, email: string, name: string) => {
    const user = await this.repository.getUserByEmail(email);

    const hashCompare = await this.bycrypt.hashPassword(password);

    if (!user) {
      return this.repository.createUser(email, hashCompare, name);
    }

    return false;
  };
}
