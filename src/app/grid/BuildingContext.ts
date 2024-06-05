import { createContext, useContext } from "react";

interface BuildingContextType {
    StructureType: any;
    placing: React.MutableRefObject<boolean>;
    User: any,
    Occupied: React.MutableRefObject<any[]>
}

export const BuildingContext = createContext<BuildingContextType | undefined>(undefined);


export function useBuldingContext() {
    const context = useContext(BuildingContext)
    if (context === undefined) {
        throw new Error('useBuildingContext cannot be undefined')
    }

    return context;
}