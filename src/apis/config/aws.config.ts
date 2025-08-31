import { CanAwsOptions } from '@can/aws';

export const AWS_CONFIG: CanAwsOptions = {
  type: 'profile',
  profile: process.env.AWS_EMAIL_PROFILE,
  region: process.env.AWS_EMAIL_REGION,
};
