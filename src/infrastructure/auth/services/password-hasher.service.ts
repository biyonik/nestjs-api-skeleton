import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { IPasswordHasher } from 'src/core/interfaces/auth/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly SALT_ROUNDS = 10;

  async hash(password: string): Promise<string> {
    return hash(password, this.SALT_ROUNDS);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
