export interface CreateUserDTO {
  login: string;
  password: string;
  experience?: number;
  level?: number;
}

export interface LoginUserDTO {
  login: string;
}

export interface UpdatePasswordDTO {
  userId: number;
  newPassword: string;
}

export interface UserResponseDTO {
  id: number;
  login: string;
  experience: number;
  level: number;
}
