import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { UserService } from '../user/user.service';
import { comparePassword } from '../../common/utils/bcrypt';
import { User } from '../user/user.model';
import * as moment from 'moment';
import { OtpService } from '../../common/services/otp/otp.service';
import {
  CanEmailNotificationService,
  CanNotificationService,
  CanSmsNotificationService,
} from '@can/notification';
import { SMS_API_CONFIG } from 'src/apis/config/sms.config';
import { ConfigService } from '@nestjs/config';
import { SmsService } from 'src/common/services/sms/sms.service';
import { QueryService } from 'src/common/services/query/query.service';
import { CanRedisService } from 'src/common/services/redis/redis.service';
import { CanAwsService } from '@can/aws';
import { Query } from 'src/common/services/query/query';
import { CanRedisKeysService } from 'src/common/services/redis/redis-keys.service';
import { UserAppRolePermissionsService } from 'src/apis/user-app-role-permissions/user-app-role-permissions.service';
import { GoogleService } from './google/google.service';
import { UserRoleService } from './user-role/user-role.service';
import { SocialChannel, SocialDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private emailService: CanEmailNotificationService,
    private otpService: OtpService,
    private smsService: SmsService,
    private notificationService: CanNotificationService,
    private configService: ConfigService,
    private queryService: QueryService,
    private redisService: CanRedisService,
    private redisKeysService: CanRedisKeysService,
    private canAwsService: CanAwsService,
    private userAppRolePermissionsService: UserAppRolePermissionsService,
    private googleService: GoogleService,
    private userRoleService: UserRoleService
  ) {}

  /**
   * Validate Email and Compare the Password
   *
   * @param email: string
   * @param password: string
   *
   * @return null | User
   */
  async validateEmailAndPassword(email: string, password: string) {
    // Validate User
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException();
    }
    // Compare Password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new ForbiddenException();
    }
    // Return User Data
    return user;
  }

  /**
   * Validate Mobile and OTP
   *
   * @param mobile: string
   * @param otp: string
   *
   * @return null | User
   */
  async validateMobileAndOtp(mobile: string, otp: string) {
    // Validate User
    const user = await this.userService.findOne({
      where: {
        mobile,
        loginOtp: otp,
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }
    // Validate Otp
    // if (!this.otpService.verifyOtp(otp)) {
    //   throw new ForbiddenException();
    // }
    // Reset OTP in DB
    await this.userService.updateById(user.id, {
      loginOtp: null,
    });
    // Return User Data
    return user;
  }

  /**
   *
   * @param email : string
   *
   * @return string
   */
  async getResetPasswordOtp(email: string): Promise<string> {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException();
    }
    const resetPasswordOtpExpiresIn = moment()
      .add('minutes', 10)
      .toISOString(); // 10 Min from Current Time
    const {loginOtp:resetPasswordOtp} = this.otpService.generateOtp();
    await this.userService.updateById(user.id, {
      resetPasswordOtpExpiresIn,
      resetPasswordOtp,
    });
    this.notificationService.sendNotification({
      category: 'Users',
      trigger: 'FORGOT_PASSWORD',
      data: {
        firstName: user.firstName,
        otp: resetPasswordOtp,
      },
      email: {
        to: [email],
      },
    });
    return resetPasswordOtp;
  }

  /**
   *
   * @param mobile : string
   *
   * @return string
   */
  async getMobileOtp(mobile: string): Promise<string> {
    const user = await this.userService.findOne({ where: { mobile } });
    if (!user) {
      throw new ForbiddenException();
    }
    const { loginOtp, otpSecret } = this.otpService.generateOtp();
    await this.userService.updateById(user.id, {
      loginOtp:'1234',
      otpSecret,
    });
    const message = `${1234} is your otp to login into gnm!`;
    const smsApi = { ...SMS_API_CONFIG };
    smsApi['mobiles'] = mobile;
    // smsApi['message'] = message;
    //   this.smsService.sendSms({
    //   mobile: mobile,
    //   message: loginOtp,
    //   route: 'api',
    //   type: 'otp',
    // });
    // this.smsService.sendSms([
    //   {
    //     channel: 'api',
    //     message,
    //     mobile,
    //     api: smsApi,
    //     smsGateway:'msg91',
    //     type:'template',
    //     templateId:this.configService.get('OTP_TEMPLATE_ID')
    //   },
    // ]);
    return loginOtp;
  }

  /**
   *
   * @param token : string
   * @param password : string
   *
   * @return boolean
   */
  async resetPassword(email: string, otp: string, password: string) {
    const user = await this.userService.findOne({
      where: { email: email, resetPasswordOtp: otp },
    });

    if (!user) {
      throw new ForbiddenException();
    }

    const { resetPasswordOtpExpiresIn } = user;

    if (moment(resetPasswordOtpExpiresIn).isBefore(moment())) {
      throw new ForbiddenException();
    }

    const isValid = this.otpService.verifyOtp(otp);

    if (!isValid) {
      throw new ForbiddenException();
    }

    this.notificationService.sendNotification({
      category: 'Users',
      trigger: 'RESET_PASSWORD_SUCCESSFUL',
      data: {
        firstName: user.firstName,
      },
      email: {
        to: [email],
      },
    });

    await this.userService.updateById(user.id, {
      password,
      resetPasswordOtpExpiresIn: null,
      resetPasswordOtp: null,
    });

    return true;
  }

  /**
   * Generate JWT Token with User Data
   *
   * @param user : UserDto
   *
   * @return string
   */
  async generateToken(
    user: any,
    expiresIn: number | string = '24h',
    status?: string
  ) {
    const userApps = await this.queryService.executeQuery<any[]>(
      Query.getActiveAppUserAndAccessPermissionsByUser(user.id)
    );
    const apps = [];

    for (let index = 0; index < userApps.length; index++) {
      apps.push({
        appId: userApps[index]['appId'],
        appName: userApps[index]['appName'],
        appImage: userApps[index]['appImage'],
        appUrl: userApps[index]['appUrl'],
        description: userApps[index]['description']
      });
    }
    const tokenData = {
 
      userId: user['id'],
      userName: user['name'],
      email: user['email'],
      roles: user['roles'],
      type: user['type'],
      apps,
    };
    let userData = await this.redisService.get(
        this.redisKeysService.userKey(user)
      );
    if(userData){
      const userView = await this.queryService.executeQuery<any[]>(
            Query.getActiveUserAndPermissions(user.id)
          );
      if(userView?.length){
        userData = userView[0];
      }
    }
    if(userData){
      try {
         userData = JSON.parse(userData);
         tokenData['clientId'] = userData['clientId'];
         tokenData['orgDisplayName'] = userData['orgDisplayName'];
      } catch (error) {
        
      }
    }
    if (status) {
      tokenData['status'] = status;
    }
    const tokenSecret: any = await this.canAwsService.getKey();
    this.dumpDataOnRedis(user);
    const result = await this.jwtService.signAsync(tokenData, {
      expiresIn,
      secret: tokenSecret,
    });
    const data = {
      refreshToken: result
    }
    const expiryTime = 60 * 24; // 24 hours
    this.redisService.setWithExpiryTime(this.redisKeysService.userTokenKey(tokenData?.userId), data, expiryTime);
    return result;
  }

  async dumpDataOnRedis(user) {
    const userApps = await this.queryService.executeQuery<any[]>(
      Query.getActiveAppUserAndAccessPermissionsByUser(user.id)
    );
    for (let index = 0; index < userApps.length; index++) {
      let activeApp = await this.redisService.get(
        this.redisKeysService.appUserKey(user, userApps[index])
      );
      // if (!activeApp) {
        // activeApp = await this.queryService.executeQuery<any[]>(
        //   Query.getActiveAppUserAndPermissions(
        //     user.id,
        //     userApps[index]['appId']
        //   )
        // );
        activeApp = await this.userAppRolePermissionsService.getUserAppRolePermissionDetails(user.id,  userApps[index]['appId'])
        if (activeApp.length > 0) {
          await this.redisService.set(
            this.redisKeysService.appUserKey(user, userApps[index]),
            JSON.stringify(activeApp[0])
          );          
        }
      // }
    }
  }

  /**
   * Validate the JWT Token is Expired or Invalid Token
   *
   * @param token: string
   *
   * @return any
   */
  async validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  /**
   * Extract the Data from the Token
   *
   * @param token : string
   *
   * @return any
   */
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async socialLogin(social: SocialDto) {
    if (social.channel == SocialChannel.GOOGLE) {
      try {
        const authErrorMessage = `You do not have authorisation to access this portal. Please contact roopesh@klugklug.com.`;
        const { access_token: accessToken } = await this.googleService.getLoginResponse(social.accessToken);
        const userInfo = await this.googleService.getUserProfile(
          accessToken
        );
        const user = await this.userService.findOne({
          where: { email: userInfo.email },
        });
        if (!user) {
          throw new ForbiddenException(authErrorMessage);
        }
        const userRole = await this.userRoleService.findAll({
          include: [{ all: true }],
          where: {
            userId: user.id,
          },
        });
        const userRoleName = [];
        for (let index = 0; index < userRole.length; index++) {
          userRoleName.push(userRole[index]['role']['name']);
        }
        const token = await this.generateToken(
          {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: userRoleName,
            type: user.type
          },
          '24h'
        );
        return { token, type: 'Bearer' };
      } catch (error) {
        throw new ForbiddenException('invalid access token');
      }
    }
  }
}
