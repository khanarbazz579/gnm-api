import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsEnum,
} from "class-validator";
import { ApplicationStatus } from "./applications.model";

export class ApplicationsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The name of the application",
    example: "My App",
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The description of the application",
    example: "My App description",
  })
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "A unique key for server-to-server authentication",
    example: "abc123xyz789",
  })
  readonly apiKey: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "An application image or logo",
    example: "https://s3.ap-south-1.amazonaws.com/prism.jpeg",
  })
  readonly appImage: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  @ApiProperty({
    description: "Status of the application",
    enum: ApplicationStatus,
    example: ApplicationStatus.ACTIVE,
  })
  readonly status?: ApplicationStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
    example: { version: "1.0", tags: ["internal", "beta"] },
  })
  readonly meta?: any;
}
