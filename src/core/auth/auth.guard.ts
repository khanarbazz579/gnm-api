import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { excludedRoutes } from '../../excluded.routes';
import { QueryService } from 'src/common/services/query/query.service';
import { Query } from 'src/common/services/query/query';
import { CanContextService } from '@can/common';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { ConfigService } from '@nestjs/config';
import { read } from 'fs';
import { HttpService } from '@nestjs/axios';
import { validateRoutes } from 'src/validate.routes';
import { CanRedisService } from 'src/common/services/redis/redis.service';
import { CanRedisKeysService } from 'src/common/services/redis/redis-keys.service';

@Injectable()
export class CanAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const url = request.url.split('?')[0];
      if (excludedRoutes.includes(url)) {
        return true;
      }
      const appContext = CanContextService.getAppContext();
      const authService = appContext.get(AuthService);
      const queryService = appContext.get(QueryService);
      const redisService = appContext.get(CanRedisService);
      const redisKeysService = appContext.get(CanRedisKeysService);

      const token = this.extractAuthorizationHeader(request.headers,'authorization');
      if (!token) {
        return false;
      }
      const isBearerToken = await this.validateTokenAndType(
        token,
        'Bearer',
        authService
      );
      if (!isBearerToken) {
        return false;
      }
      const decodedValue: any = this.extractTokenValue(authService, token);
      if (!decodedValue) {
        return false;
      }
      let user = await redisService.get(
        redisKeysService.userKey(decodedValue)
      );
      if (!user) {
        user = await queryService.executeQuery<any[]>(
          Query.getActiveUserAndPermissions(decodedValue.userId)
        );
        if (user.length > 0) {
          await redisService.set(
            redisKeysService.userKey(decodedValue),
            JSON.stringify(user[0])
          );
          user = user[0];
        } else {
          if(decodedValue.apps.length > 0){
              user = {
                user_id : decodedValue.userId,
                user_name : decodedValue.userName,
                roles : [],
                permissions : [],
                email :  decodedValue.email,
                type: decodedValue.type,
                mobile: decodedValue.mobile
              };
          }else{
            return false;
          }
        }
      } else {
        user = JSON.parse(user);
      }
      request['tokenData'] = decodedValue;
      request['user'] = user;

      if (!(await this.validateCustomerRole(context, request, url))) {
        return false;
      }
      /**
       * Add Created By And Updated By to the Request Body
       */
      if (request['user'] && request['user'].user_id) {
        if (request.method.toUpperCase() === 'POST') {
          request.body = {
            ...request.body,
            createdById: request['user'].user_id,
          };
          return true;
        }
        if (
          request.method.toUpperCase() === 'PATCH' ||
          request.method.toUpperCase() === 'PUT'
        ) {
          request.body = {
            ...request.body,
            updatedById: request['user'].user_id,
          };
          return true;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private async validateCustomerRole(
    context: ExecutionContext,
    request: Request,
    url: string
  ): Promise<boolean> {
    switch (request.method.toUpperCase()) {
      case 'POST':
        if (
          validateRoutes.includes(url.toLowerCase()) &&
          this.isCustomerRole(request)
        ) {
          if (request['body']['userId'] != request['user']['user_id']) {
            return false;
          }
        }
        return true;
      case 'GET':
      case 'PATCH':
      case 'DELETE':
        if (
          validateRoutes.includes(
            request.route.path.split('/:id')[0].toLowerCase()
          ) &&
          this.isCustomerRole(request) &&
          'id' in request.params
        ) {
          const appContext = CanContextService.getAppContext();
          const className = context.getClass().name;
          const classInstance = appContext.get(context.getClass());
          const separatedName = className.split('Controller')[0];
          const serviceName =
            separatedName[0].toLowerCase() + separatedName.slice(1) + 'Service';
          const data = await classInstance[serviceName].findById(
            request.params['id']
          );
          if (
            'userId' in data &&
            request['user']['user_id'] != data['userId']
          ) {
            return false;
          }
        }
        return true;
      default:
        return true;
    }
  }


  private extractAuthorizationHeader(
    headers: IncomingHttpHeaders,
    key: 'authorization' |'refreshtoken'
  ): string | null {
    if (key in headers) {
      return headers[key] as any;
    }
    return null;
  }

  private async validateTokenAndType(
    token: string,
    type: string,
    authService: AuthService,
  ) {
    if (!token || !type) {
      return false;
    }
    const splittedToken = token.split(' ');
    if (splittedToken.length != 2) {
      return false;
    }
    if (splittedToken[0] !== type) {
      return false;
    }
    // const isValidToken = await authService.validateToken(splittedToken[1]);
    // if (!isValidToken) {
    //   return false;
    // }
    return true;
  }

  private isCustomerRole(request: Request): boolean {
    const hasRole = request['user']['roles'].find(
      (role: string) => role.toLowerCase() === 'customer'
    );
    return hasRole ? true : false;
  }

  private extractTokenValue(authService: AuthService, token: string) {
    const decoded = authService.decodeToken(token.split(' ')[1]);
    return decoded;
  }
}
