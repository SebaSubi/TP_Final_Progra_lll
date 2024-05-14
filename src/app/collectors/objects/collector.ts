export default interface Collectors {
  id: number;
  name: string;
  img: React.ReactNode;
  cost: number;
  prod_per_hour: number;
  workers: 1;
  level: 1;
  unlock_level: number;
  maxWorkers: number;
  capacity?: number;
  position: { x: number; y: number };
  updateTime?: Date;
}



