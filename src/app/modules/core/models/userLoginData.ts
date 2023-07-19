export interface UserLoginData {
  username: string;
  password: string;
}

export interface GetUsersResponse {
  id: number;
  email: string;
  password: string;
  username: string;
}

export class User {
  constructor(public email: string, public username: string) {}
}

export type PostUser = Omit<GetUsersResponse, 'id'>;

export type PostUserResponse = GetUsersResponse;
