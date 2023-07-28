export interface IUser {
  id: string;
  name: string;
  allowance: number;
  nextPayday: Date;
  balance: number;
  avatar: string;
  changed: Date;
}
