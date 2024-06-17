export interface User {
  userId: string,
  name: string,
  level: number,
  country: string,
  boosts: any[],
  units: any[],
  gold: number,
  materials: any[],
}

export interface UserBuildings {
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
  position: {x: number, y: number}
}