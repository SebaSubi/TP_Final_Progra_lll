import { create } from 'zustand';
import { Boost, Material, type User } from '../types';
import { updateUserInstance } from '../server/userInstance';


interface State {
   user: User;
   fetchUser: (userId: string) => Promise<void>;
   useBoost: (boost: string) => void;
   buyBoost: (boost: Boost) => void;
   updateMaterials: (material: string, quantity: number) => void;
   updateAllMaterials: (name: string, quantity: number) => void;
}



export const useUserStore = create<State>((set, get) => ({
   user: {
      userId: "",
      name: "",
      level: 0,
      country: "",
      boosts: [],
      units: 0,
      gold: 0,
      materials: [],
   },

   fetchUser: async (userId: string) => {
      const response = await fetch(`/api/user_instance?userId=${userId}`);
      const data = await response.json();
      set({ user: data.instance });
   },

   useBoost: (boost: string) => {
      const { user } = get()
      const newBoostArray = structuredClone(user.boosts);
      for (let i = 0; i < user.boosts.length; i++) {
         if (user.boosts[i].name === boost) {
            newBoostArray[i].quantity -= 1;
            set({ user: { ...user, boosts: newBoostArray } });
            const newUser = { ...user, boosts: newBoostArray }
            //gotta updtae the data base as well
            updateUserInstance(newUser)
         }
      }
      // return user.boosts;
   },

   buyBoost: (boost: Boost) => {
      const { user } = get()
      const newBoostArray = structuredClone(user.boosts);
      if(newBoostArray.length != 0) {
      for (let i = 0; i < user.boosts.length; i++) {
         if (user.boosts[i].name === boost.name) {

            newBoostArray[i].quantity += 1;
            //We add 1 to the boost quantity
            set({ user: { ...user, boosts: newBoostArray, gold: user.gold - boost.cost}});
            const newUser = { ...user, boosts: newBoostArray, gold: user.gold - boost.cost}
            //gotta updtae the data base as well
            updateUserInstance(newUser)
          } else if(i === user.boosts.length) {
            newBoostArray.push(boost)
            newBoostArray[newBoostArray.length - 1].quantity = 1;
            set({ user: { ...user, boosts: newBoostArray, gold: user.gold - boost.cost}});
            const newUser = { ...user, boosts: newBoostArray, gold: user.gold - boost.cost}
            //gotta updtae the data base as well
            updateUserInstance(newUser)
          }
      }
   } else { 
      newBoostArray.push(boost)
      newBoostArray[newBoostArray.length - 1].quantity = 1;
      set({ user: { ...user, boosts: newBoostArray, gold: user.gold - boost.cost}});
      const newUser = { ...user, boosts: newBoostArray, gold: user.gold - boost.cost}
      //gotta updtae the data base as well
      updateUserInstance(newUser)
   }
      // const newUser = { ...user, gold: user.gold - boost.cost}
      // set({ user: newUser});
      // updateUserInstance(newUser)  

      // return user.boosts;
   },

   updateMaterials: (material: string, quantity: number) => {
      const { user } = get()
      const newMaterialArray = structuredClone(user.materials);
      if (material === "Gold") {
         set({ user: { ...user, gold: user.gold + quantity } });
         const newUser = { ...user, gold: user.gold + quantity }
         //gotta update the data base as well
         updateUserInstance(newUser)
      }
      else {
         for (let i = 0; i < user.materials.length; i++) {
            if (user.materials[i].name === material) {
               const numericQuantity = Number(quantity);
               newMaterialArray[i].quantity += numericQuantity;
               set({ user: { ...user, materials: newMaterialArray}});
               const newUser = { ...user, materials: newMaterialArray}
               //gotta update the data base as well
               updateUserInstance(newUser)
            }
         }
      }

      // return user.boosts;
   },

   updateAllMaterials: (name: string, quantity: number) => {
      const { user } = get()
      const newMaterialArray = structuredClone(user.materials);
      for (let i = 0; i < user.materials.length; i++) {
         if (user.materials[i].name === name) {
            newMaterialArray[i].quantity -= quantity;
            set({ user: { ...user, materials: newMaterialArray}});
            const newUser = { ...user, materials: newMaterialArray}
            //gotta update the data base as well
            updateUserInstance(newUser)
          }
   }
}



}));
