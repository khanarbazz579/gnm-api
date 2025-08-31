import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsNumber,
  IsString,
  IsObject,
  IsDateString,
} from "class-validator";
import { UserStatus } from "./user.model";

enum Gender {
  MALE = "male",
  FEMALE = "female",
  UNISEX = "unisex",
}

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "The user's login email" })
  readonly email: string;

  @IsOptional()
  @IsEnum(UserStatus)
  @ApiProperty({
    description: "Status of the user",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  readonly status: UserStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
  })
  readonly meta: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly middleName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @ApiProperty()
  readonly mobile: string;

  @IsOptional()
  @IsString()
  readonly loginInfo: string;

  @IsOptional()
  @IsString()
  readonly otpSecret: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsDateString()
  readonly resetPasswordOtpExpiresIn: string;

  @IsOptional()
  @IsString()
  readonly resetPasswordOtp: string;

  @IsOptional()
  @IsString()
  readonly loginOtp: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  readonly gender: Gender;

  @IsOptional()
  @IsNumber()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  readonly updatedById: number;
}
