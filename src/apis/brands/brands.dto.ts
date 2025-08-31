import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsEnum,
  IsUrl,
} from "class-validator";
import { BrandStatus } from "./brands.model";

export class BrandsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "ID of the organisation that owns this brand" })
  readonly organisationId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "The official name of the brand" })
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: "The brand's primary website URL",
    required: false,
    example: "https://brandwebsite.com",
  })
  readonly website?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The main social media platform the brand uses",
    required: false,
    example: "Instagram",
  })
  readonly primarySocialChannel?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "The average amount spent on influencers per month",
    required: false,
    example: 50000.75,
  })
  readonly avgMonthlyInfluencerSpend?: number;

  @IsOptional()
  @IsEnum(BrandStatus)
  @ApiProperty({
    description: "Status of the brand",
    enum: BrandStatus,
    example: BrandStatus.ACTIVE,
  })
  readonly status?: BrandStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description:
      "Additional onboarding data like marketing objectives and competitor brand IDs",
    required: false,
    example: {
      objectives: ["brand awareness", "reach GenZ"],
      competitors: [1001, 1002],
    },
  })
  readonly meta?: any;
}
