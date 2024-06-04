import { createContext, useContext } from "react";

interface BuildingContextType {
    StructureType: React.MutableRefObject<string>;
    placing: React.MutableRefObject<boolean>;
}

export const BuildingContext = createContext<BuildingContextType | undefined>(undefined);


export function useBuldingContext() {
    const context = useContext(BuildingContext)
    if (context === undefined) {
        throw new Error('useBuildingContext cannot be undefined')
    }

    return context;
}