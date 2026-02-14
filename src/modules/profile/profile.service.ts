import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { calculateZodiac } from 'src/common/utils/chinese-zodiac.util';
import { calculateHoroscope } from 'src/common/utils/horoscope.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
  ) {}

  async createProfile(userId: string, dto: CreateProfileDto) {
    const existing = await this.profileModel.findOne({ userId });

    if (existing) {
      throw new BadRequestException('Profile already exists');
    }

    const birthDate = new Date(dto.birthday);

    const horoscope = calculateHoroscope(birthDate);
    const zodiac = calculateZodiac(birthDate.getFullYear());

    const profile = await this.profileModel.create({
      userId,
      ...dto,
      birthday: birthDate,
      horoscope,
      zodiac,
    });

    return profile;
  }

  async getProfile(userId: string) {
    return this.profileModel
      .findOne({ userId })
      .select('-__v -createdAt -updatedAt')
      .lean();
  }

  async updateProfile(userId: string, dto: Partial<CreateProfileDto>) {
    if (dto.birthday) {
      const birthDate = new Date(dto.birthday);
      dto['horoscope'] = calculateHoroscope(birthDate);
      dto['zodiac'] = calculateZodiac(birthDate.getFullYear());
    }

    return this.profileModel.findOneAndUpdate({ userId }, dto, { new: true });
  }
}
