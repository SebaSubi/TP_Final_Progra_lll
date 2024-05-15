export default interface Barracs {
  id: number;
  name: string;
  img: React.ReactNode;
  cost: number;
  producing: string;
  prod_per_hour: number;
  workers: 1;
  level: 1;
  unlock_level: number;
  maxWorkers: number;
  maxCap?: number;
  position: { x: number; y: number };
}



