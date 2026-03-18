import { schemaLogin } from '../schema/schemaAuth.ts';

export default class AuthUserService {
  public login = (password: string, email: string) => {
    const { error, success } = schemaLogin(password, email);
    if (error) {
      return { error };
    }
    return { success };
  };
}
