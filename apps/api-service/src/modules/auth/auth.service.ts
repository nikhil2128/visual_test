import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any): Promise<any> {
    try {
      const payload = { userId: 'dummy_userId' };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '90d' });

      return {
        id: user.id,
        email: user.email,
        accessToken: accessToken,
      };
    } catch (err) {
      throw err;
    }
  }

  async validateUser(username: string, password: string) {
    return {
      id: 'dummy_userId',
    };
  }
}
