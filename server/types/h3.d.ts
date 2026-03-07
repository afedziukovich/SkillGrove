import type { User } from '~~/server/models/entities/user';
import type { Session } from '~~/server/models/entities/session';

declare module 'h3' {
  interface H3EventContext {
    auth?: {
      user: User;
      session: Session;
      token: string;
    };
  }
}
