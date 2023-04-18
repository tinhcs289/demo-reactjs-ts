export type AuthenticationUserInfo = {
  id: string;
  username: string;
  displayname?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  polices?: string[];
};
export type AuthenticationJWT = {
  accessToken: string;
  refreshToken: string;
  expires: number;
};
export type Authentication = {
  user: AuthenticationUserInfo;
  jwt: AuthenticationJWT;
  hasNotBeenActivated?: boolean;
};
