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
  UseInterceptors,
} from "@nestjs/common";
import { logWrapper } from "src/common/utils/helper";

@Controller("test")
export class TestController {
  constructor() {}

  @Get()
  async testget() {
    logWrapper(200, { a: "b" }, "test message", "http://localhost", "success");
    return "abcd";
  }
}
