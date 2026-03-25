import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: {
      id: number;
      name: string;
      email: string;
      work?: string;
      city?: string;
      avatar?: string;
      cover?: string;
    };
  }
}
