export type Role = 'user' | 'system';

export type Message = {
  id: string;
  role: Role;
  text: string;
};
