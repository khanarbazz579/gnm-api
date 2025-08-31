export interface CanCurrentUser {
  user_id: number;
  user_name: string;
  roles: string[];
  permissions: string[];
  orgDisplayName: string;
  clientId: string| number;
  email?: string;
  status: 'active' | 'inactive';
}

export interface CanCurrentUserToken {
  token: string;
}
