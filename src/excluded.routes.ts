export const excludedRoutes = [
  // Auth Related Routes
  '/v1',
  '/v1/auth/login/email',
  '/v1/auth/login/mobile',
  '/v1/auth/google/login-url',
  '/v1/auth/google/redirect',
  '/v1/auth/facebook/login-url',
  '/v1/auth/facebook/redirect',
  '/v1/auth/generate-otp',
  '/v1/auth/recover',
  '/v1/auth/reset-password',
  // Normal Routes
  '/v1/users',
  '/v1/url-parse/x-frame',
  '/v1/shipping-info/create',
  '/v1/shipping-info/validate-po',
  '/v1/files/shipment-info',
  '/v1/health-check',
  '/v1/nexus/test',
  '/v1/auth/login/social'
];
