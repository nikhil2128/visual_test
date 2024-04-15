import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../shared/providers/local.auth.guard';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth Management')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req, @Body() loginAuthDto: LoginAuthDto): Promise<any> {
    return Promise.resolve(this.authService.login(req.user));
  }
}
