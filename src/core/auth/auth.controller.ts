import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
  InternalServerErrorException,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  LoginEmailDto,
  RecoverDto,
  ResetPasswordDto,
  RecoverResponseDto,
  ResetPasswordResponseDto,
  LoginResponseDto,
  LoginOtpDto,
  GenerateMobileOtpDto,
  SocialDto,
} from "./auth.dto";
import { Request } from "express";
import { CanAuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login/email")
  @HttpCode(200)
  async loginWithEmail(
    @Body(ValidationPipe) loginDto: LoginEmailDto
  ): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const token = await this.authService.generateToken(
      await this.authService.validateEmailAndPassword(email, password)
    );
    if (!token) {
      throw new InternalServerErrorException();
    }
    return { token, type: "Bearer" };
  }

  @Post("generate-otp")
  @HttpCode(200)
  async generateMobileOtp(
    @Body(ValidationPipe) otpDto: GenerateMobileOtpDto
  ): Promise<RecoverResponseDto> {
    const { mobile } = otpDto;
    await this.authService.getMobileOtp(mobile);
    return { message: `Otp sent successfully on ${mobile}!` };
  }

  @Post("login/mobile")
  @HttpCode(200)
  async loginWithOtp(
    @Body(ValidationPipe) loginDto: LoginOtpDto
  ): Promise<LoginResponseDto> {
    const { otp, mobile } = loginDto;
    const token = await this.authService.generateToken(
      await this.authService.validateMobileAndOtp(mobile, otp)
    );
    if (!token) {
      throw new InternalServerErrorException();
    }
    return { token, type: "Bearer" };
  }

  @Post("recover")
  @HttpCode(200)
  async recover(
    @Body(ValidationPipe) recoverDto: RecoverDto
  ): Promise<RecoverResponseDto> {
    const { email } = recoverDto;
    await this.authService.getResetPasswordOtp(email);
    return { message: `Otp sent successfully on ${email}!` };
  }

  @Post("reset-password")
  @HttpCode(200)
  async resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto
  ): Promise<ResetPasswordResponseDto> {
    const { email, otp, password } = resetPasswordDto;
    const isSuccess = await this.authService.resetPassword(
      email,
      otp,
      password
    );
    if (!isSuccess) {
      throw new InternalServerErrorException();
    }
    return { message: "Password updated successfully!" };
  }

  @Get("me")
  @UseGuards(CanAuthGuard)
  async getMe(@Req() req: Request) {
    const user = req["user"];
    // user_id, email, full_name, organisation_id, permissions
    return {
      user_id: user.user_id || user.id,
      email: user.email,
      full_name: user.full_name || user.name,
      organisation_id: user.organisation_id,
      permissions: user.permissions || [],
    };
  }

  @Post('login/social')
  @HttpCode(200)
  async loginWithSocial(@Body(ValidationPipe) socialDto: SocialDto) {
    return this.authService.socialLogin(socialDto);
  }
}
