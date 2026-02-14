import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  createProfile(@Req() req, @Body() dto: CreateProfileDto) {
    return this.profileService.createProfile(req.user.sub, dto);
  }

  @Get('')
  getProfile(@Req() req) {
    return this.profileService.getProfile(req.user.sub);
  }

  @Patch('')
  updateProfile(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.sub, dto);
  }
}
