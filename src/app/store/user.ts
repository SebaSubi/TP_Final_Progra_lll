import { create } from 'zustand';
import { Boost, type User } from '../types';
import { updateUserInstance } from '../server/userInstance';


interface State {
   sendMaterials(recipientId: any, materialIndex: any): unknown;
   user: User;
   fetchUser: (userId: string) => Promise<void>;
   useBoost: (boost: string) => void;
   buyBoost: (boost: Boost) => void;
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
   //   console.log(data.instance)
     set({ user: data.instance });
   //   console.log("fetched user worked");
   },

   useBoost: (boost: string) => {
      const { user } = get()
      const newBoostArray = structuredClone(user.boosts);
      for (let i = 0; i < user.boosts.length; i++) {
         if (user.boosts[i].name === boost) {
            newBoostArray[i].quantity -= 1;
            set({ user: { ...user, boosts: newBoostArray}});
            const newUser = { ...user, boosts: newBoostArray}
            //gotta updtae the data base as well
            updateUserInstance(newUser)
          }
      }
      // console.log(user.boosts)
      // return user.boosts;
   },

   buyBoost: (boost: Boost) => {
      const { user } = get()
      console.log(user)
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
          } else {
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
      // console.log(newUser)
      // updateUserInstance(newUser)  

      // console.log(user.boosts)
      // return user.boosts;
   },

   
   
   sendMaterials: (recipientId: string, materialId: string) => {
      const { user } = get();
  
      // Find the index of the material in user's materials array
      const materialIndex = user.materials.findIndex(material => material.id === materialId);
      
      if (materialIndex !== -1) {
          // Material exists, update quantity
          const updatedUser = {
              ...user,
              materials: user.materials.map((material, index) => {
                  if (index === materialIndex) {
                      return {
                          ...material,
                          quantity: material.quantity - 1 
                      };
                  }
                  return material;
              })
          };
          
          // Update Zustand store
          set({ user: updatedUser });
  
          // Update instances in the database
          updateUserInstance(updatedUser);
      } else {
          // Material does not exist, add it with initial quantity
          const newMaterial = {
              id: materialId,
              name: "Lumber", // Default name for illustration
              img: "/Wood.png", // Default image URL for illustration
              quantity: 1 // Initial quantity
          };
  
          const updatedUser = {
              ...user,
              materials: [...user.materials, newMaterial]
          };
  
          // Update Zustand store
          set({ user: updatedUser });
  
          // Update instances in the database
          updateUserInstance(updatedUser);
      }
  },
  
  
  
}));

   

