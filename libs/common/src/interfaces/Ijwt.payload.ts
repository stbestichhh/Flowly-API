export interface IjwtPayload {
  sub: string;
  email: string;
  banStatus: boolean;
  roles?: string[];
}
