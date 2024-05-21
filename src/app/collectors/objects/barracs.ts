export default interface Barracs {
  id: number;
  name: string;
  img: React.ReactNode;
  cost: number;
  producing: string;
  prod_per_hour: number;
  workers: number;
  level: number;
  unlock_level: number;
  maxWorkers: number;
  maxCap?: number;
  position: { x: number; y: number };
}



