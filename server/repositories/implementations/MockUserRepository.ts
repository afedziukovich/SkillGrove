import type { User } from '~~/server/models/user';
import type { IUserRepository } from '../interfaces';
import usersData from '~~/server/data/users.json';

export class MockUserRepository implements IUserRepository {
  private users: User[];
  private idCounter: number;

  constructor() {
    this.users = usersData as User[];
    this.idCounter = Math.max(1, ...this.users.map((u) => u.id)) + 1;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user, id: this.idCounter++ };
    this.users.push(newUser);
    return newUser;
  }

  async findById(id: number): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.users.find((u) => u.login === login) || null;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) throw new Error('User not found');
    this.users[index] = user;
    return user;
  }

  async updatePassword(userId: number, newPasswordHash: string, newSalt: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new Error('User not found');

    user.password_hash = newPasswordHash;
    user.salt = newSalt;

    return user;
  }

  async deleteById(id: number): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
