import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('')
  @ResponseMessage('Profile created successfully')
  createProfile(@CurrentUser() user, @Body() dto: CreateProfileDto) {
    return this.profileService.createProfile(user.userId, dto);
  }

  @Get('')
  @ResponseMessage('Profile fetched successfully')
  getProfile(@CurrentUser() user) {
    return this.profileService.getProfile(user.userId);
  }

  @Patch('')
  @ResponseMessage('Profile updated successfully')
  updateProfile(@CurrentUser() user, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(user.userId, dto);
  }
}
