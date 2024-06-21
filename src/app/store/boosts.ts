import { create } from 'zustand';
import { type Boost } from '../types';


interface State {
   boosts: Boost[];
   boost: Boost;
   fetchBoosts: (userId: string) => Promise<void>;
   setBoost: (name: string) => void;
}



export const useBoostStore = create<State>((set, get) => ({
   boosts: [],
   boost: {
    id: 0,
    name: "",
    type: "",
    img: "",
    quantity: 0,
    boost: 1.0,
    cost: 0
   },
 
   fetchBoosts: async (userId: string) => {
     const response = await fetch(`/api/user_instance?userId=${userId}`);
     const data = await response.json();
     set({ boosts: data.instance.boosts });
   },

   setBoost: (name: string) => {
     const boosts = get().boosts;
     for (let i = 0; i < boosts.length; i++) {
       if (boosts[i].name === name) {         
         set({ boost: boosts[i] });

       }
     }
   }  
 }));

//  for (let i = 0; i < data.instance.boosts.length; i++) {
//   if (data.instance.boosts[i].name === name) {
//    // console.log(data.instance.boosts[i]);
//     set({ boost: data.instance.boosts[i] });
//   }
// }
