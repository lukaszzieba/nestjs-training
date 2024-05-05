import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
    );
    const cookie = await this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-cookie', cookie);

    return user;
  }

  @Post('signin')
  async signIp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(
      signUpDto.email,
      signUpDto.password,
    );
    const cookie = await this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-cookie', cookie);

    return user;
  }

  @Get('signout')
  async signOut(@Res({ passthrough: true }) res: Response) {
    const cookie = this.authService.getCookieForLogOut();
    res.setHeader('Set-cookie', cookie);
    res.sendStatus(200);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }
}
