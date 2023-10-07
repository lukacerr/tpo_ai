import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(username: string, password: string) {
    const user = await this.usersService.findUnique({
      where: { username },
    });

    if (!(user && (await compare(password, user.password))))
      throw new UnauthorizedException();

    return await this.jwtService.signAsync(user);
  }
}
