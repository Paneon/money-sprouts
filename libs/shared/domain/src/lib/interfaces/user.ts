export interface User {
  "@id"?: string;
  email?: string;
  name?: string;
  roles?: any;
  password?: string;
  allowance?: number;
  nextPayday?: Date;
  avatar?: string;
  transactions?: string[];
  balance?: number;
  readonly userIdentifier?: string;
}
