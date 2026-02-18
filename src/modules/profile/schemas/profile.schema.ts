import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  })
  userId: Types.ObjectId;

  @Prop()
  displayNamme: string;

  @Prop({ enum: ['Male', 'Female'] })
  gender: string;

  @Prop()
  birthday: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ type: [String] })
  interest: string[];

  @Prop()
  profileImage: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

// ProfileSchema.index({ userId: 1 }, { unique: true });

ProfileSchema.set('toJSON', {
  transform: (_, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    if (ret.birthday) {
      ret.birthday = ret.birthday.toISOString().split('T')[0];
    }

    return ret;
  },
});

ProfileSchema.virtual('age').get(function () {
  if (!this.birthday) return null;

  const diff = Date.now() - this.birthday.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
});

ProfileSchema.set('toJSON', { virtuals: true });
