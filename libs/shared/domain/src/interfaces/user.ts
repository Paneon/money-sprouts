export interface User {
  readonly id: number;
  email?: string;
  name: string;
  roles: string[];
  password?: string;
  allowance?: number;
  nextPayday?: Date;
  avatar?: string;
  transactions?: string[];
  balance?: number;
  tracked: boolean;
  readonly userIdentifier?: string;
}
