import { create } from 'zustand';
import { type User } from '../types';


interface State {
   user: User;
   fetchUser: (userId: string) => Promise<void>;
}



export const useUserStore = create<State>((set, get) => ({
   user: {
      userId: "",
      name: "",
      level: 0,
      country: "",
      boosts: [],
      units: [],
      gold: 0,
      materials: [],
   },
 
   fetchUser: async (userId: string) => {
     const response = await fetch(`/api/user_instance?userId=${userId}`);
     const data = await response.json();
     console.log(data.instance)
     set({ user: data.instance });
     console.log("fetched user worked");
   },
 }));