import type { User } from '~~/server/models/user';
import type { Session } from '~~/server/models/session';

declare module 'h3' {
  interface H3EventContext {
    auth?: {
      user: User;
      session: Session;
      token: string;
    };
  }
}
