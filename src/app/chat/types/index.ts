export type Role = 'user' | 'gpt'

export type Message = {
  id: string,
  role: Role,
  text: string
}