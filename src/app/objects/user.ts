import { Boosts } from "./boost";

export interface User {
  id: number,
  name: string,
  username: string,
  password: string,
  level: number,
  boosts?: Boosts[]
  workers: number; 
  fullname?: string,
}

