import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsEnum,
} from "class-validator";
import { CategoryStatus } from "./categories.model";

export class CategoriesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the category (e.g., "FMCG," "Beauty")',
    example: "FMCG",
  })
  readonly name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "ID of the parent category (for sub-category hierarchy)",
    required: false,
    example: 3,
  })
  readonly parentId?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "ID of the brand this category belongs to",
    required: false,
    example: 5,
  })
  readonly brandId?: number;

  @IsOptional() // Because the model provides a default
  @IsEnum(CategoryStatus)
  @ApiProperty({
    description: "Status of the category",
    enum: CategoryStatus,
    required: false,
    example: CategoryStatus.ACTIVE,
  })
  readonly status?: CategoryStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
    example: { display_order: 1 },
  })
  readonly meta?: any;
}
