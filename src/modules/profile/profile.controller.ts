import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  createProfile(@CurrentUser() user, @Body() dto: CreateProfileDto) {
    return this.profileService.createProfile(user.userId, dto);
  }

  @Get('')
  getProfile(@CurrentUser() user) {
    return this.profileService.getProfile(user.userId);
  }

  @Patch('')
  updateProfile(@CurrentUser() user, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(user.userId, dto);
  }
}
