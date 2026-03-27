import { UserRepository } from '../repository/userRepository.js';

export default class ConfigService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  public updateUser = async (
    userId: number,
    email: string,
    name: string,
    city: string,
    work: string,
  ) => {
    const existingUser = await this.repository.getUserByEmail(email);

    if (existingUser && existingUser.id !== userId) {
      return { ok: false, reason: 'email_in_use' as const };
    }

    const result = await this.repository.updateUserById(
      userId,
      email,
      name,
      city,
      work,
    );

    return { ok: true, reason: null as string | null, updated: result.affectedRows > 0 };
  };
}
