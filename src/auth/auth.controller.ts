import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuhtDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signUp(
    @Body() authDto: AuhtDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signUp(authDto.email, authDto.password);
    const cookie = await this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-cookie', cookie);

    return user;
  }

  @Post('signin')
  async signIp(
    @Body() authDto: AuhtDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(authDto.email, authDto.password);
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
