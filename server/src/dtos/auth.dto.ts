export interface RegisterReqDto {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface LoginReqDto {
  userSession: string;
  password: string;
}
