export interface LocalUser {
  email: string;
  password: string;
  dateEnregistrement: Date;
}

export interface User extends LocalUser {
  id: string;
}
