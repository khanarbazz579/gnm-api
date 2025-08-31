import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsObject,
  IsNotEmpty,
} from "class-validator";
import { Status } from "src/common/enums/status.enum";

export class AppRolesDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "ID of the application",
    required: true,
    example: 3,
  })
  readonly appId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The name of the role (e.g., admin, executive)",
    example: "admin",
  })
  readonly name: string;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({
    description: "Status of the role",
    enum: Status,
    default: Status.ACTIVE,
  })
  readonly status?: Status;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
    example: { department: "Finance", level: 2 },
  })
  readonly meta?: any;
}
