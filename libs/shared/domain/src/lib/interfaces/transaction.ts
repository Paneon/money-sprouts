export interface Transaction {
  "@id"?: string;
  title?: string;
  type?: number;
  value?: number;
  applied?: boolean;
  user?: string;
  readonly expense?: boolean;
  readonly earning?: boolean;
}
