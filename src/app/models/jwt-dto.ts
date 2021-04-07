export class JwtDto {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  id: number;
  email: string;
  username: string;
  jti: string;
  authorities: Authorities[];
}

export class Authorities {
  id: number;
  name: string;
}
