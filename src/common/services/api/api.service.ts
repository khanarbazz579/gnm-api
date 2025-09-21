import { Injectable } from "@nestjs/common";
import { map, retry } from "rxjs/operators";
import { CanApiOptions } from "./api.type";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async request(option: CanApiOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        let test = 1;
        const res = await this.httpService
          .request(option)
          .pipe(
            map((res: any) => {
              return res.data;
            }),
            retry(2),
          )
          .toPromise();

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async requestRetry(option: CanApiOptions, retryAttempt = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        let test = 1;
        const res = await this.httpService
          .request(option)
          .pipe(
            map((res: any) => {
              return res.data;
            }),
            retry(retryAttempt),
          )
          .toPromise();

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async requestForB2b(option: CanApiOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        let test = 1;
        const res = await this.httpService
          .request(option)
          .pipe(
            map((res: any) => {
              return res.data;
            }),
          )
          .toPromise();

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async requestForFormData(option: CanApiOptions) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.httpService
          .request(option)
          .pipe(
            map((res: any) => {
              return res.data;
            }),
          )
          .toPromise();

        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}
