export default interface Units {
  id: number;
  name: string;
  img: React.ReactNode;
  cost: number;
  production_time: number; //CHANGE TO TRAINING TIME WHEN ADDING TO DATA BASE
  level: 1;
  unlock_level: number;

  // position: { x: number; y: number };
}



