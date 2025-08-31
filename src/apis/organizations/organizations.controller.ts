import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from "@nestjs/common";
import { OrganizationsDto } from "./organizations.dto";
import { OrganizationsService } from "./organizations.service";
import { ParseFilterPipe } from "src/common/pipes/parse-filter.pipe";
import { FindOptions, CountOptions } from "sequelize";
import { User } from "src/core/user/user.model";
import { OrganizationUsersService } from "../organization-users/organization-users.service";

@Controller("organizations")
export class OrganizationsController {
  constructor(
    private organizationsService: OrganizationsService,
    private organizationUsersService: OrganizationUsersService
  ) {}

  @Post()
  async create(@Body(ValidationPipe) organizationsDto: OrganizationsDto) {
    return this.organizationsService.create(organizationsDto);
  }

  @Get()
  async findAll(@Query("filter", ParseFilterPipe) filter: FindOptions) {
    return this.organizationsService.findAll(filter);
  }

  @Get("count")
  async count(@Query("filter", ParseFilterPipe) filter: CountOptions) {
    return this.organizationsService.count(filter);
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    return this.organizationsService.findById(id);
  }

  @Get(":id/users")
  async getOrganizationUsers(@Param("id", ParseIntPipe) id: number) {
    // Find all organization-user links for this organization, including user details
    const orgUsers = await this.organizationUsersService.findAll({
      where: { organizationId: id },
      include: [{ model: User }],
    });
    // Return just the user objects
    return orgUsers.map((ou) => ou.user);
  }

  @Patch(":id")
  async updateById(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    organizationsDto: OrganizationsDto
  ) {
    return this.organizationsService.updateById(id, organizationsDto);
  }
}
