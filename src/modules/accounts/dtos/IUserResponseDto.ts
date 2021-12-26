export interface IUserResponseDto {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  avatar_url(): string;
}
