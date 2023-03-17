export type Role = 'user' | 'gpt'

export type Message = {
  id: number,
  role: Role,
  text: string
}