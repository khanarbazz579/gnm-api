import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  IsEnum,
  IsOptional,
} from "class-validator";

export enum SocialChannel {
  FACEBOOK = "facebook",
  GOOGLE = "google",
  APPLE = "apple",
  OFFICE365 = "office365",
}
export class LoginEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class LoginOtpDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  mobile: string;

  @IsNotEmpty()
  @ApiProperty()
  otp: string;
}

export class LoginResponseDto {
  token: string;
  type: "Bearer";
}

export class RecoverDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class GenerateMobileOtpDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  mobile: string;
}

export class RecoverResponseDto {
  message: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  otp: string;

  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  password: string;
}

export class ResetPasswordResponseDto {
  message: string;
}

export class SocialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(SocialChannel, {
    message: "channel should be google, facebook, apple, office365",
  })
  channel: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  channelId: string;
}
