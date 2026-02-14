import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: any) {
    const { username, email, password } = dto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new BadRequestException('Email or username is already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    return {
      message: 'User resgistered successfully',
      userId: user._id,
    };
  }

  async login(dto: any) {
    const { emailOrUsername, password } = dto;

    const user = await this.userModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload = {
      sub: user._id,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
