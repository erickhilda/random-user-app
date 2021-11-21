export type GenderType = 'male' | 'female' | 'all'

export interface IUser {
  gender: GenderType;
  name: string;
  email: string;
  registered: string;
}
