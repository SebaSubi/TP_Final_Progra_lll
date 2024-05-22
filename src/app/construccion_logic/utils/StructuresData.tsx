import Collectors from "@/app/collectors/objects/collector";
import Barracs from "@/app/collectors/objects/barracs";

export type Structure = {
  id: number;
  position: { x: number; y: number };
};

export const glod_mine_Array: Collectors[] = [];
export const lumber_camp_Array: Collectors[] = [];
export const stone_mine_Array: Collectors[] = [];
export const barracs_Array: Barracs[] = [];
