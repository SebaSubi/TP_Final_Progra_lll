import { Dayjs } from "dayjs"

export interface User {
  userId: string,
  name: string,
  level: number,
  country: string,
  boosts: any[],
  units: number,
  gold: number,
  materials: any[],
}

export interface UserBuildings {
  _id: string,
  userId: string,
  name: string,
  cost: number,
  img: string,
  prod_per_hour: number,
  lastCollected: Date, //Check if this is the correct type
  workers: number,
  level: number,
  unlock_level: number,
  maxWorkers: number,
  capacity: number,
  maxCapacity: number,
  position: { x: number, y: number }
}

export interface Boost {
  id: number,
  name: string,
  type: string
  img: string,
  cost: number,
  boost: number,
  quantity: number
}

export interface Material {
  id: number,
  name: string,
  img: string,
  quantity: number
}

