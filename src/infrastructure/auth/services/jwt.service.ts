import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from 'src/core/exceptions/base/unauthorized.exception';
import { IJwtService } from 'src/core/interfaces/auth/jwt-service.interface';
import { SignOptions } from 'jsonwebtoken';

@Injectable()
export class JwtService implements IJwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(private readonly configService: ConfigService) {
    this.secret = this.configService.get<string>('JWT_SECRET');
    this.expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '1h');

    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  }

  sign(payload: Record<string, any>): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    } as SignOptions);
  }

  verify<T extends Record<string, any>>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  decode<T extends Record<string, any>>(token: string): T | null {
    return jwt.decode(token) as T | null;
  }
}
