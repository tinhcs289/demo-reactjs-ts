export type TAuthenticationUserInfo = {
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

export type TAuthenticationJWT = {
  accessToken: string;
  refreshToken: string;
  expires: number;
};

export type TAuthentication = {
  user: TAuthenticationUserInfo;
  jwt: TAuthenticationJWT;
  hasNotBeenActivated?: boolean;
};
