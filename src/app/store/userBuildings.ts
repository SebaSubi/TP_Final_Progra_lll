import { create } from 'zustand';
import { type UserBuildings } from '../types';
import { updateBuilding } from '../server/userBuilding';
import { updateData } from '../logic/production';
import { use } from 'react';


interface State {
   userBuildings: UserBuildings[];
   userBuilding: UserBuildings;
   fetchBuildings: (userId: string) => Promise<void>;
   updateProduction: (newCapacity: number, resetTime: boolean) => Promise<void>;
   fetchBuilding: (buildingId: string) => Promise<void>;
   upgradeBuilding: (building: UserBuildings) => Promise<void>;
}



export const useBuildingsStore = create<State>((set, get) => ({
   userBuildings: [],
   userBuilding: {
      _id: "",
      userId: "",
      name: "",
      cost: 0,
      img: "",
      prod_per_hour: 0,
      lastCollected: new Date(), //Check if this is the correct type
      workers: 0,
      level: 0,
      unlock_level: 0,
      maxWorkers: 0,
      capacity: 0,
      maxCapacity: 0,
      position: { x: 0, y: 0 }
   },

   fetchBuildings: async (userId: string) => {
      const response = await fetch(`/api/userBuildings?userId=${userId}`);
      const data = await response.json();
      set({ userBuildings: data.buildings });
   },

   fetchBuilding: async (buildingId: string) => {
      const response = await fetch(`/api/userBuildings/${buildingId}`);
      const data = await response.json();
      set({ userBuilding: data.userBuilding });
   },

   updateProduction: async (newCapacity: number, resetTime: boolean) => {
      const { userBuilding } = get();
      userBuilding.capacity = newCapacity;
      if (resetTime) {
         userBuilding.lastCollected = new Date();
      }
      // userBuilding.lastCollected = new Date();
      updateBuilding(userBuilding);
      // const response = updateBuilding(building)
   },

   upgradeBuilding: async (building: UserBuildings) => {
      updateBuilding(building)
      set({ userBuilding: building });
   }

}));