export enum Role {
  SENDER = "SENDER",
  BIKER = "BIKER",
}

export interface User {
  id: number;
  name: string;
  password: string;
  role: Role;
}
