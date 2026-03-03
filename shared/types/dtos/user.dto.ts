export interface CreateUserDTO {
  login: string;
  password: string;
  experience?: number;
  level?: number;
}

export interface LoginUserDTO {
  login: string;
}

export interface UserCredentialsDTO {
  login: string;
  password: string;
}

export interface UpdatePasswordDTO {
  userId: number;
  newPassword: string;
}

export interface UserDTO {
  id: number;
  login: string;
  experience: number;
  level: number;
}
