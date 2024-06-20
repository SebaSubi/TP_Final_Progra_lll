import { create } from 'zustand';
import { Boost, type User } from '../types';
import { updateUserInstance } from '../server/userInstance';


interface State {
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
   }
 }));
