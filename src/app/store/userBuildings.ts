import { create } from 'zustand';
import { type UserBuildings } from '../types';


interface State { 
   userBuildings: UserBuildings[];
   fetchBuildings: (userId: string) => Promise<void>;
}



export const useBuildingsStore = create<State>((set, get) => ({
   userBuildings: [],
 
   fetchBuildings: async (userId: string) => {
     const response = await fetch(`/api/userBuildings?userId=${userId}`);
     const data = await response.json();
     console.log(data.buildings)
     set({ userBuildings: data.buildings });
    //  console.log("fetched user worked");
   },
 }));