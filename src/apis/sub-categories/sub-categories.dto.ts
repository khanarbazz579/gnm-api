import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class SubCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly categoryId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
