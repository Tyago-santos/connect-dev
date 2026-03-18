import { connection } from '../database/connection.ts';

export class UserRepository {
  private conn: Promise<mysql.Pool>;

  constructor() {
    this.conn = connection();
  }
  public async getAllUsers() {
    try {
      const [rows] = await (await this.conn).query('SELECT * FROM  users');
      console.log(rows);
    } catch (err) {
      console.error(`erro ao pegar usúarios ${err}`);
    }
  }

  public async getUserById(id: number) {
    try {
      const [rows] = await (await this.conn).query('SELECT * FROM  users WHERE email = ? ', [id]);
      console.log(rows);
    } catch (err) {
      console.error(`erro ao pegar usúario por id ${err}`);
    }
  }

  public async createUser(email: string, password: string, name: string, birthdate: Date) {
    try {
      const [rows] = await (
        await this.conn
      ).query('INSERT INTO users (name, email, password, birthdate) VALUES (?, ? ,? , ?', [
        name,
        password,
        email,
        birthdate,
      ]);
      console.log(rows);
    } catch (err) {
      console.error(`erro ao criar usúario ${err}`);
    }
  }
}
